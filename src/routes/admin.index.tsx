import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const fetchBlocks = useServerFn(getSiteContentBlocks);
  const saveBlockFn = useServerFn(saveSiteContentBlock);
  const uploadFn = useServerFn(uploadMedia);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [editJson, setEditJson] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newData, setNewData] = useState("{}");
  const [lastUploadUrl, setLastUploadUrl] = useState<string>("");

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate({ to: "/admin/login" });
    }
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
      .catch((error) => {
        setStatus(`Failed to load content: ${error instanceof Error ? error.message : String(error)}`);
      });
  }, [fetchBlocks]);

  const filteredBlocks = useMemo(
    () =>
      blocks.filter((block) => {
        if (!filter.trim()) return true;
        const search = filter.toLowerCase();
        return (
          block.key.toLowerCase().includes(search) ||
          block.label.toLowerCase().includes(search) ||
          JSON.stringify(block.data).toLowerCase().includes(search)
        );
      }),
    [blocks, filter],
  );

  const handleSave = async (block: ContentBlock) => {
    const raw = editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2);
    let parsed: unknown;

    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      setStatus("Invalid JSON format. Please fix errors before saving.");
      return;
    }

    setSavingKey(block.key);
    setStatus("");

    try {
      const saved = await saveBlockFn({
        key: block.key,
        label: block.label,
        data: parsed,
      });

      setBlocks((prev) => prev.map((item) => (item.key === saved.key ? saved : item)));
      setEditJson((prev) => ({ ...prev, [saved.key]: JSON.stringify(saved.data ?? {}, null, 2) }));
      setStatus(`Saved ${saved.label}`);
    } catch (error) {
      setStatus(`Save failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSavingKey(null);
    }
  };

  const handleCreate = async () => {
    try {
      const parsed = JSON.parse(newData);
      if (!newKey.trim() || !newLabel.trim()) {
        setStatus("Block key and label are required.");
        return;
      }

      const saved = await saveBlockFn({
        key: newKey.trim(),
        label: newLabel.trim(),
        data: parsed,
      });

      setBlocks((prev) => [saved, ...prev]);
      setEditJson((prev) => ({ ...prev, [saved.key]: JSON.stringify(saved.data ?? {}, null, 2) }));
      setNewKey("");
      setNewLabel("");
      setNewData("{}");
      setStatus(`Created ${saved.label}`);
    } catch (error) {
      setStatus(`Create failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleUpload = async (file: File) => {
    setStatus("");
    setLastUploadUrl("");

    try {
      const base64 = await fileToBase64(file);
      const { url } = await uploadFn({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        base64,
      });

      setLastUploadUrl(url);
      setStatus("Upload succeeded. The URL is ready to paste into the JSON content.");
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setStatus((prev) => `${prev} URL copied to clipboard.`);
      }
    } catch (error) {
      setStatus(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
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
            <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
              View site
            </Link>
            <button onClick={signOut} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Search content blocks</h2>
              <p className="text-sm text-muted-foreground">Filter by key, label, or block content.</p>
              <input
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Search blocks..."
                className="mt-4 w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground"
              />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Upload image or video</h2>
                  <p className="text-sm text-muted-foreground">Upload a media file and paste the returned URL into your content JSON.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="cursor-pointer rounded-2xl border border-border bg-secondary px-4 py-3 text-sm text-foreground transition hover:bg-muted">
                  Choose file
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(event) => event.target.files?.[0] && handleUpload(event.target.files[0])}
                    className="hidden"
                  />
                </label>
                {lastUploadUrl && (
                  <div className="break-all text-sm text-foreground/80">{lastUploadUrl}</div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Create new content block</h2>
            <p className="text-sm text-muted-foreground">Add a new site_content block for pages or sections.</p>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Block key</span>
                <input
                  value={newKey}
                  onChange={(event) => setNewKey(event.target.value)}
                  placeholder="home.new_block"
                  className="mt-2 w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Label</span>
                <input
                  value={newLabel}
                  onChange={(event) => setNewLabel(event.target.value)}
                  placeholder="Home — New Block"
                  className="mt-2 w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">JSON data</span>
                <textarea
                  value={newData}
                  onChange={(event) => setNewData(event.target.value)}
                  rows={8}
                  className="mt-2 w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground font-mono text-sm"
                />
              </label>
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Create block
              </button>
            </div>
          </div>
        </section>

        {status && (
          <div className="rounded-3xl border border-border bg-card p-4 text-sm text-foreground/80">{status}</div>
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
                onChange={(value) => setEditJson((prev) => ({ ...prev, [block.key]: value }))}
                onSave={() => handleSave(block)}
                saving={savingKey === block.key}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

function BlockCard({
  block,
  value,
  onChange,
  onSave,
  saving,
}: {
  block: ContentBlock;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{block.key}</p>
          <h3 className="text-xl font-semibold">{block.label}</h3>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save block"}
        </button>
      </div>
      <div className="mt-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground/70">
            <strong>Created:</strong> {new Date(block.created_at).toLocaleString()}
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground/70">
            <strong>Updated:</strong> {new Date(block.updated_at).toLocaleString()}
          </div>
        </div>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={14}
          className="w-full rounded-3xl border border-border bg-input px-4 py-4 font-mono text-sm leading-relaxed text-foreground"
        />
      </div>
    </div>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Unable to read file"));
        return;
      }
      const commaIndex = result.indexOf(",");
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
