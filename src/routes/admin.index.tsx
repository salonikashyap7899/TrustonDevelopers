import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getSiteContentBlocks, saveSiteContentBlock, uploadMedia } from "@/lib/content.functions";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin · Truston" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type ContentBlock = {
  id: string;
  key: string;
  label: string;
  data: unknown;
  created_at: string;
  updated_at: string;
};

type SaveStatus = { type: "success" | "error" | "info"; message: string } | null;

/** Maps a content-block key prefix to the public page URL */
function previewUrl(blockKey: string): string | null {
  if (blockKey.startsWith("home.")) return "/";
  if (blockKey.startsWith("about.")) return "/about-us";
  if (blockKey.startsWith("contact.")) return "/contact";
  if (blockKey.startsWith("services.")) return "/services";
  if (blockKey.startsWith("project.")) return "/project";
  if (blockKey.startsWith("partner.")) return "/channel-partner";
  return null;
}

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const fetchBlocks = useServerFn(getSiteContentBlocks);
  const saveBlockFn = useServerFn(saveSiteContentBlock);
  const uploadFn = useServerFn(uploadMedia);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [editJson, setEditJson] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SaveStatus>(null);
  const [filter, setFilter] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);
  const [lastUploadUrl, setLastUploadUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) navigate({ to: "/admin/login" });
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    fetchBlocks()
      .then((data) => {
        setBlocks(data);
        setEditJson(
          Object.fromEntries(
            data.map((block) => [block.key, JSON.stringify(block.data ?? {}, null, 2)]),
          ),
        );
      })
      .catch((err) => {
        setStatus({ type: "error", message: `Failed to load: ${err instanceof Error ? err.message : String(err)}` });
      });
  }, [fetchBlocks]);

  const filteredBlocks = useMemo(
    () =>
      blocks.filter((block) => {
        if (!filter.trim()) return true;
        const s = filter.toLowerCase();
        return (
          block.key.toLowerCase().includes(s) ||
          block.label.toLowerCase().includes(s) ||
          JSON.stringify(block.data).toLowerCase().includes(s)
        );
      }),
    [blocks, filter],
  );

  const handleSave = async (block: ContentBlock) => {
    const raw = editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2);
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      setStatus({ type: "error", message: "Invalid JSON — fix the formatting before saving." });
      return;
    }

    setSavingKey(block.key);
    setStatus({ type: "info", message: "Saving…" });

    try {
      // ⚠️ TanStack Start v1: server fns MUST be called as fn({ data: yourPayload })
      // The framework strips the outer `data` wrapper before passing to inputValidator.
      const saved = await saveBlockFn({
        data: {
          key: block.key,
          label: block.label,
          data: parsed,
        },
      });

      setBlocks((prev) => prev.map((b) => (b.key === saved.key ? saved : b)));
      setEditJson((prev) => ({ ...prev, [saved.key]: JSON.stringify(saved.data ?? {}, null, 2) }));
      setLastSavedKey(saved.key);
      setStatus({
        type: "success",
        message: `✓ "${saved.label}" saved! The website will show the change immediately.`,
      });
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      setStatus({ type: "error", message: `Save failed: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setSavingKey(null);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setLastUploadUrl("");
    setStatus({ type: "info", message: "Uploading file…" });
    try {
      const base64 = await fileToBase64(file);
      // ⚠️ Same TanStack Start calling convention fix
      const { url } = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          base64,
        },
      });
      setLastUploadUrl(url);
      if (navigator.clipboard) await navigator.clipboard.writeText(url);
      setStatus({ type: "success", message: "✓ Uploaded! URL copied to clipboard — paste it into image_url or video_url, then save." });
    } catch (err) {
      setStatus({ type: "error", message: `Upload failed: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setUploading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Admin Panel</p>
            <h1 className="text-3xl font-display">Site Content Editor</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
              View live site ↗
            </a>
            <button onClick={signOut} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-5 text-sm text-blue-200 leading-relaxed">
          <p className="font-semibold text-blue-100 mb-1">How to update your website</p>
          <ol className="list-decimal ml-4 space-y-1 text-blue-200/80">
            <li>Find the section you want (e.g. <strong>Home — Hero</strong> for the main heading).</li>
            <li>Edit the fields — change <code className="bg-white/10 px-1 rounded">title</code>, <code className="bg-white/10 px-1 rounded">subtitle</code>, or paste a URL into <code className="bg-white/10 px-1 rounded">image_url</code> / <code className="bg-white/10 px-1 rounded">video_url</code>.</li>
            <li>Click <strong>Save block</strong> — the change appears on the site immediately.</li>
            <li>Use <strong>Preview page ↗</strong> on each block to see the result live.</li>
          </ol>
        </div>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Search content blocks</h2>
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="e.g. hero, about, contact…"
                className="mt-4 w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground"
              />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Upload image or video</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Upload a file → URL auto-copies to clipboard → paste into <code className="bg-muted px-1 rounded text-xs">image_url</code> or <code className="bg-muted px-1 rounded text-xs">video_url</code> → Save.
              </p>
              <div className="mt-4">
                <label className={`inline-block cursor-pointer rounded-2xl border border-border px-4 py-3 text-sm text-foreground transition ${uploading ? "opacity-50 cursor-wait bg-muted" : "bg-secondary hover:bg-muted"}`}>
                  {uploading ? "Uploading…" : "Choose file to upload"}
                  <input type="file" accept="image/*,video/*" disabled={uploading}
                    onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                    className="hidden" />
                </label>
              </div>
              {lastUploadUrl && (
                <div className="mt-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-3">
                  <p className="text-xs text-green-300 font-semibold mb-1">URL ready — paste into image_url or video_url:</p>
                  <p className="break-all text-xs text-green-200 font-mono">{lastUploadUrl}</p>
                  <button onClick={() => navigator.clipboard?.writeText(lastUploadUrl)}
                    className="mt-2 text-xs text-green-300 hover:underline">Copy URL</button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Field reference</h2>
            <div className="mt-4 space-y-3 text-sm">
              {[
                { field: "title", desc: "Main heading" },
                { field: "title_accent", desc: "Coloured part of heading" },
                { field: "subtitle", desc: "Sub-heading / tagline" },
                { field: "eyebrow", desc: "Small label above heading" },
                { field: "image_url", desc: "Background or feature image URL" },
                { field: "video_url", desc: "Background video URL (.mp4)" },
                { field: "body", desc: "Paragraph text" },
              ].map(({ field, desc }) => (
                <div key={field} className="flex gap-3 items-start">
                  <code className="shrink-0 rounded-lg bg-muted px-2 py-0.5 text-xs">{field}</code>
                  <span className="text-muted-foreground text-xs leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {status && (
          <div className={`rounded-3xl border p-4 text-sm font-medium ${
            status.type === "success" ? "border-green-500/40 bg-green-500/10 text-green-200"
            : status.type === "error"  ? "border-red-500/40 bg-red-500/10 text-red-200"
            : "border-blue-500/40 bg-blue-500/10 text-blue-200"
          }`}>
            {status.message}
          </div>
        )}

        <section className="space-y-6">
          {filteredBlocks.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No matching content blocks found.
            </div>
          ) : (
            filteredBlocks.map((block) => (
              <BlockCard
                key={block.key}
                block={block}
                value={editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2)}
                onChange={(v) => setEditJson((prev) => ({ ...prev, [block.key]: v }))}
                onSave={() => handleSave(block)}
                saving={savingKey === block.key}
                justSaved={lastSavedKey === block.key}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

function BlockCard({
  block, value, onChange, onSave, saving, justSaved,
}: {
  block: ContentBlock;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  justSaved: boolean;
}) {
  let parsed: Record<string, unknown> | null = null;
  try { parsed = JSON.parse(value); } catch { parsed = null; }

  const simpleFields = parsed
    ? Object.entries(parsed).filter(([, v]) => typeof v === "string" || typeof v === "number")
    : [];

  const preview = previewUrl(block.key);

  return (
    <div className={`rounded-3xl border bg-card p-6 transition-colors duration-500 ${justSaved ? "border-green-500/50" : "border-border"}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{block.key}</p>
          <h3 className="text-xl font-semibold mt-0.5">{block.label}</h3>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {preview && (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Preview page ↗
            </a>
          )}
          {justSaved && <span className="text-xs text-green-400 font-semibold">✓ Saved!</span>}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save block"}
          </button>
        </div>
      </div>

      {simpleFields.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {simpleFields.map(([field, val]) => (
            <div key={field}>
              <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1.5">{field}</label>
              <input
                value={String(val)}
                onChange={(e) => {
                  if (!parsed) return;
                  onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2));
                }}
                placeholder={field.includes("url") ? "https://…" : ""}
                className={`w-full rounded-xl border border-border bg-input px-3 py-2 text-sm text-foreground ${field.includes("url") ? "font-mono" : ""}`}
              />
            </div>
          ))}
        </div>
      )}

      <details className="mt-5 group">
        <summary className="cursor-pointer text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors select-none">
          Advanced — raw JSON editor
        </summary>
        <div className="mt-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            className="w-full rounded-3xl border border-border bg-input px-4 py-4 font-mono text-sm leading-relaxed text-foreground"
          />
        </div>
      </details>
    </div>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") { reject(new Error("Unable to read file")); return; }
      const i = result.indexOf(",");
      resolve(i >= 0 ? result.slice(i + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
