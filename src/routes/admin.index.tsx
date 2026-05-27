import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  getSiteContentBlocks,
  saveSiteContentBlock,
  uploadMedia,
  seedDefaultContent,
} from "@/lib/content.functions";

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
  const seedFn = useServerFn(seedDefaultContent);

  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [editJson, setEditJson] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SaveStatus>(null);
  const [filter, setFilter] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);
  const [lastUploadUrl, setLastUploadUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) navigate({ to: "/admin/login" });
  }, [isAdmin, loading, navigate]);

  const loadBlocks = () => {
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
  };

  useEffect(() => { loadBlocks(); }, [fetchBlocks]);

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

  const handleSeed = async (overwrite: boolean) => {
    setSeeding(true);
    setStatus({ type: "info", message: overwrite ? "Resetting all blocks to defaults…" : "Initialising missing content blocks…" });
    try {
      await seedFn({ data: { overwrite } });
      loadBlocks();
      setStatus({
        type: "success",
        message: overwrite
          ? "✓ All content reset to defaults — every section now has its default text."
          : "✓ All missing sections have been initialised — you can now edit every section below.",
      });
      setTimeout(() => setStatus(null), 7000);
    } catch (err) {
      setStatus({ type: "error", message: `Seed failed: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setSeeding(false);
    }
  };

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
        message: `✓ "${saved.label}" saved! Changes appear on the website immediately.`,
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
      const { url } = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          base64,
        },
      });
      setLastUploadUrl(url);
      if (navigator.clipboard) await navigator.clipboard.writeText(url);
      setStatus({ type: "success", message: "✓ File uploaded! URL copied to clipboard — paste it into the image_url or video_url field, then click Save block." });
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

        {/* STEP 1: Initialize all sections */}
        <div className="rounded-3xl border border-[#00BFFF]/30 bg-[#00BFFF]/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-semibold text-white mb-1">Step 1 — Initialize all website sections</p>
              <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                Click <strong className="text-white">Initialize all sections</strong> to create editable content blocks for every section on your site (hero, services, why choose us, call to action, etc.). You only need to do this once. After that, all sections appear below and you can edit them.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => handleSeed(false)}
                disabled={seeding}
                className="rounded-full bg-[#00BFFF] px-5 py-2.5 text-sm font-semibold text-[#04090f] disabled:opacity-60 whitespace-nowrap hover:brightness-110"
              >
                {seeding ? "Initializing…" : "Initialize all sections"}
              </button>
              <button
                onClick={() => {
                  if (confirm("This will reset ALL content to defaults and overwrite your changes. Continue?")) handleSeed(true);
                }}
                disabled={seeding}
                className="rounded-full border border-red-500/40 px-5 py-2.5 text-sm text-red-400 disabled:opacity-60 hover:bg-red-500/10 whitespace-nowrap"
              >
                Reset all to defaults
              </button>
            </div>
          </div>
        </div>

        {/* STEP 2: How to change images and videos */}
        <div className="rounded-3xl border border-amber-500/25 bg-amber-500/5 p-6">
          <p className="font-semibold text-amber-200 mb-2">Step 2 — Changing images or videos</p>
          <ol className="list-decimal ml-4 space-y-1.5 text-sm text-amber-200/70">
            <li>Use the <strong className="text-amber-200">Upload image / video</strong> panel below — click "Choose file" and pick a file from your computer.</li>
            <li>After upload, the URL is automatically copied to your clipboard.</li>
            <li>Find the content block you want to update (e.g. Home — Hero), paste the URL into the <code className="bg-white/10 px-1 rounded">image_url</code> or <code className="bg-white/10 px-1 rounded">video_url</code> field.</li>
            <li>Click <strong className="text-amber-200">Save block</strong> — the image/video updates on the website immediately.</li>
          </ol>
        </div>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {/* Search */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-1">Search content blocks</h2>
              <p className="text-sm text-muted-foreground mb-4">Filter by section name or keyword</p>
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="e.g. hero, services, why truston…"
                className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground"
              />
              {blocks.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">{filteredBlocks.length} of {blocks.length} sections shown</p>
              )}
            </div>

            {/* Upload */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-1">Upload image or video from your computer</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Pick any image or video file → it uploads to the server → you get a URL → paste it into any <code className="bg-muted px-1 rounded text-xs">image_url</code> or <code className="bg-muted px-1 rounded text-xs">video_url</code> field below → Save block.
              </p>
              <label className={`inline-flex items-center gap-3 cursor-pointer rounded-2xl border-2 px-5 py-3 text-sm font-semibold transition ${uploading ? "opacity-50 cursor-wait border-border bg-muted text-muted-foreground" : "border-[#00BFFF]/40 bg-[#00BFFF]/10 text-[#00BFFF] hover:bg-[#00BFFF]/20"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {uploading ? "Uploading…" : "Choose file from computer"}
                <input type="file" accept="image/*,video/*" disabled={uploading}
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                  className="hidden" />
              </label>

              {lastUploadUrl && (
                <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                  <p className="text-xs text-green-300 font-semibold mb-1">✓ Upload complete — URL copied to clipboard!</p>
                  <p className="break-all text-xs text-green-200 font-mono mb-2">{lastUploadUrl}</p>
                  <p className="text-xs text-green-300/70">Now paste this URL into the <code className="bg-white/10 px-1 rounded">image_url</code> or <code className="bg-white/10 px-1 rounded">video_url</code> field in the block below, then click Save block.</p>
                  <button onClick={() => navigator.clipboard?.writeText(lastUploadUrl)}
                    className="mt-2 text-xs text-green-400 hover:underline font-medium">Copy URL again</button>
                </div>
              )}
            </div>
          </div>

          {/* Field reference */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-1">Field reference</h2>
            <p className="text-sm text-muted-foreground mb-4">What each field name means</p>
            <div className="space-y-3 text-sm">
              {[
                { field: "title", desc: "Main heading" },
                { field: "title_accent", desc: "Highlighted/blue part of heading" },
                { field: "eyebrow", desc: "Small label above heading" },
                { field: "subtitle", desc: "Sub-heading below main title" },
                { field: "body", desc: "Main paragraph text" },
                { field: "body_secondary", desc: "Second paragraph text" },
                { field: "image_url", desc: "Background / section image URL" },
                { field: "video_url", desc: "Background video URL (.mp4)" },
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

        {blocks.length === 0 && (
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
            <p className="text-amber-200 font-semibold text-lg mb-2">No content blocks yet</p>
            <p className="text-amber-200/60 text-sm mb-4">Click "Initialize all sections" above to create editable blocks for every section of your website.</p>
          </div>
        )}

        <section className="space-y-6">
          {filteredBlocks.map((block) => (
            <BlockCard
              key={block.key}
              block={block}
              value={editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2)}
              onChange={(v) => setEditJson((prev) => ({ ...prev, [block.key]: v }))}
              onSave={() => handleSave(block)}
              saving={savingKey === block.key}
              justSaved={lastSavedKey === block.key}
            />
          ))}
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
            <a href={preview} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
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
            <div key={field} className={field.includes("url") ? "sm:col-span-2" : ""}>
              <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1.5">
                {field}
                {field.includes("url") && <span className="ml-2 normal-case tracking-normal text-[10px] text-muted-foreground/60">(paste URL from upload, or a web URL)</span>}
              </label>
              <input
                value={String(val)}
                onChange={(e) => {
                  if (!parsed) return;
                  onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2));
                }}
                placeholder={field.includes("url") ? "https://… (upload a file above to get a URL)" : ""}
                className={`w-full rounded-xl border border-border bg-input px-3 py-2 text-sm text-foreground ${field.includes("url") ? "font-mono text-xs" : ""}`}
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
