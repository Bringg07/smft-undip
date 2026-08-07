"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Upload, FileText, FileDown } from "lucide-react";
import { fileToDataUrl } from "@/lib/image";
import { useToast } from "@/components/admin/Toast";

interface DokumenItem {
  id: number;
  judul: string;
  kategori: string;
  deskripsi: string | null;
  filename: string | null;
  file: string;
  createdAt: string;
}

const emptyForm = {
  judul: "",
  kategori: "Peraturan Senat",
  deskripsi: "",
  file: "",
  filename: "",
};

const dokumenKategori = [
  "Peraturan Senat",
  "Keputusan",
  "Pedoman",
  "Rekomendasi",
  "Laporan",
  "Lainnya",
];

export default function AdminDokumenPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<DokumenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DokumenItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dokumen");
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

  const openEdit = (item: DokumenItem) => {
    setEditing(item);
    setForm({
      judul: item.judul,
      kategori: item.kategori,
      deskripsi: item.deskripsi ?? "",
      file: item.file,
      filename: item.filename ?? "",
    });
    setShowForm(true);
    setError(null);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setForm((f) => ({ ...f, file: dataUrl, filename: file.name }));
      toast.success("File berhasil dibaca.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal membaca file.");
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.file) {
      setError("Pilih file terlebih dahulu.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      judul: form.judul,
      kategori: form.kategori,
      deskripsi: form.deskripsi || null,
      filename: form.filename || null,
      file: form.file,
    };

    try {
      const res = await fetch(editing ? `/api/dokumen/${editing.id}` : "/api/dokumen", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan dokumen.");
        return;
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditing(null);
      await load();
      router.refresh();
      toast.success(editing ? "Dokumen diperbarui." : "Dokumen berhasil diunggah.");
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: DokumenItem) => {
    if (!confirm(`Hapus dokumen "${item.judul}"?`)) return;
    const res = await fetch(`/api/dokumen/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      router.refresh();
      toast.success("Dokumen berhasil dihapus.");
    } else {
      toast.error("Gagal menghapus dokumen.");
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
            Arsip
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Kelola Dokumen</h1>
          <p className="mt-2 font-body text-sm text-white/50">
            Dokumen resmi yang bisa diunduh pengunjung (PDF, dsb.).
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300"
        >
          <Plus size={16} />
          Tambah Dokumen
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass mb-10 space-y-5 rounded-xl2 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-white">
              {editing ? "Ubah Dokumen" : "Tambah Dokumen Baru"}
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

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="d-judul" className={labelClass}>Judul Dokumen</label>
              <input
                id="d-judul"
                className={inputClass}
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="d-kategori" className={labelClass}>Kategori</label>
              <select
                id="d-kategori"
                className={inputClass}
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              >
                {dokumenKategori.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="d-deskripsi" className={labelClass}>Deskripsi (opsional)</label>
            <textarea
              id="d-deskripsi"
              className={inputClass}
              rows={2}
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass}>File ({editing ? "ganti file opsional" : "wajib"})</label>
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gold-400/30 bg-perlemen-900 px-3 py-3 text-sm text-white/60 transition-colors hover:border-gold-400 hover:text-gold-300 ${
                uploading ? "opacity-60" : ""
              }`}
            >
              <Upload size={15} />
              {uploading ? "Memproses..." : form.filename ? `File: ${form.filename}` : "Pilih file (PDF, DOCX, dll.)"}
              <input type="file" className="hidden" onChange={handleFile} disabled={uploading} />
            </label>
            {editing && !form.filename && (
              <p className="mt-2 text-xs text-white/40">File saat ini tetap dipakai jika tidak diganti.</p>
            )}
          </div>

          {error && (
            <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-300">{error}</p>
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
              disabled={saving || uploading}
              className="flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Unggah Dokumen"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat dokumen...</p>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-white/40">Belum ada dokumen. Tambahkan lewat tombol di atas.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  <FileText size={22} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-heading text-base text-white">{item.judul}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                    <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-2.5 py-0.5 text-gold-300">
                      {item.kategori}
                    </span>
                    {item.filename && <span>{item.filename}</span>}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <a
                  href={item.file}
                  download={item.filename ?? "dokumen"}
                  className="flex items-center gap-1.5 rounded-full border border-gold-400/30 px-4 py-2 text-xs text-gold-300 transition-colors hover:bg-gold-400/10"
                >
                  <FileDown size={13} />
                  Unduh
                </a>
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
