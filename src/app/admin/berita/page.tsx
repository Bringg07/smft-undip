"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

interface BeritaItem {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
}

const emptyForm = {
  title: "",
  category: "Berita Utama",
  author: "Divisi Humas SMFT",
  date: "",
  excerpt: "",
  content: "",
};

export default function AdminBeritaPage() {
  const router = useRouter();
  const [items, setItems] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BeritaItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/berita");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  };

  const openEdit = (item: BeritaItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      author: item.author,
      date: item.date,
      excerpt: item.excerpt,
      content: item.content.join("\n\n"),
    });
    setShowForm(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      category: form.category,
      author: form.author,
      date: form.date || undefined,
      excerpt: form.excerpt,
      content: form.content
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    };

    if (payload.content.length === 0) {
      setError("Isi berita tidak boleh kosong.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(editing ? `/api/berita/${editing.id}` : "/api/berita", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan berita.");
        return;
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditing(null);
      await load();
      router.refresh();
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: BeritaItem) => {
    if (!confirm(`Hapus berita "${item.title}"?`)) return;

    const res = await fetch(`/api/berita/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      router.refresh();
    } else {
      alert("Gagal menghapus berita.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gold-400/20 bg-perlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400";
  const labelClass = "mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Konten
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Kelola Berita</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300"
        >
          <Plus size={16} />
          Tambah Berita
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="glass mb-10 space-y-5 rounded-xl2 p-6 md:p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-white">
              {editing ? "Ubah Berita" : "Tambah Berita Baru"}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-white/50 transition-colors hover:text-white"
              aria-label="Tutup form"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <label htmlFor="b-title" className={labelClass}>Judul</label>
            <input
              id="b-title"
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="b-category" className={labelClass}>Kategori</label>
              <input
                id="b-category"
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                list="kategori-berita"
                required
              />
              <datalist id="kategori-berita">
                <option value="Berita Utama" />
                <option value="Kegiatan" />
                <option value="Pengumuman" />
                <option value="Legislasi" />
                <option value="Advokasi" />
              </datalist>
            </div>
            <div>
              <label htmlFor="b-author" className={labelClass}>Penulis</label>
              <input
                id="b-author"
                className={inputClass}
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="b-date" className={labelClass}>Tanggal (opsional)</label>
              <input
                id="b-date"
                className={inputClass}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="cth: 25 Juli 2026"
              />
            </div>
          </div>

          <div>
            <label htmlFor="b-excerpt" className={labelClass}>Ringkasan (ekscerpt)</label>
            <textarea
              id="b-excerpt"
              className={inputClass}
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="b-content" className={labelClass}>
              Isi Berita (pisahkan paragraf dengan baris kosong)
            </label>
            <textarea
              id="b-content"
              className={inputClass}
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          {error && (
            <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-perlemen-700 px-6 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Terbitkan"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat berita...</p>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-white/40">
          Belum ada berita. Klik tombol “Tambah Berita” di atas untuk membuat yang pertama.
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gold-300">
                    {item.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">
                    {item.date}
                  </span>
                </div>
                <h3 className="mt-2 truncate font-heading text-lg text-white">{item.title}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-white/50">{item.excerpt}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1.5 rounded-full border border-gold-400/30 px-4 py-2 text-xs text-gold-300 transition-colors hover:bg-gold-400/10"
                >
                  <Pencil size={13} />
                  Ubah
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="flex items-center gap-1.5 rounded-full border border-rose-400/30 px-4 py-2 text-xs text-rose-300 transition-colors hover:bg-rose-400/10"
                >
                  <Trash2 size={13} />
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
