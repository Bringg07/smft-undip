"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, X, Loader2, Upload } from "lucide-react";
import { fileToStoredDataUrl } from "@/lib/image";
import { useToast } from "@/components/admin/Toast";

interface GaleriItem {
  id: number;
  judul: string;
  gambar: string;
  createdAt: string;
}

export default function AdminGaleriPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/galeri");
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

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToStoredDataUrl(file);
      setGambar(dataUrl);
      toast.success("Foto berhasil diproses.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memuat foto.");
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!gambar) {
      setError("Pilih foto terlebih dahulu.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: judul || "Tanpa judul", gambar }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan foto.");
        return;
      }
      setShowForm(false);
      setJudul("");
      setGambar("");
      await load();
      toast.success("Foto berhasil ditambahkan ke galeri.");
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: GaleriItem) => {
    if (!confirm(`Hapus foto "${item.judul}"?`)) return;
    const res = await fetch(`/api/galeri/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      toast.success("Foto berhasil dihapus.");
    } else {
      toast.error("Gagal menghapus foto.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gold-400/20 bg-perlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Dokumentasi
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Kelola Galeri</h1>
          <p className="mt-2 font-body text-sm text-white/50">
            Foto kegiatan yang tampil di halaman Galeri.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm((v) => !v);
            setError(null);
          }}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Tutup" : "Upload Foto"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass mb-10 space-y-5 rounded-xl2 p-6 md:p-8">
          <div>
            <label htmlFor="g-judul" className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300">
              Judul / Keterangan
            </label>
            <input
              id="g-judul"
              className={inputClass}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="cth: Rapat Paripurna Perdana"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300">
              Foto
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gold-400/30 bg-perlemen-900 px-3 py-3 text-sm text-white/60 transition-colors hover:border-gold-400 hover:text-gold-300 ${
                uploading ? "opacity-60" : ""
              }`}
            >
              <Upload size={15} />
              {uploading ? "Memproses..." : gambar ? "Ganti foto" : "Pilih foto"}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={uploading} />
            </label>
            {gambar && (
              <div className="relative mt-3 overflow-hidden rounded-lg border border-gold-400/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gambar} alt="Pratinjau" className="max-h-64 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setGambar("")}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/90 text-white"
                  title="Hapus foto"
                >
                  <X size={14} />
                </button>
              </div>
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
              {saving ? "Menyimpan..." : "Simpan ke Galeri"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat galeri...</p>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-white/40">Belum ada foto. Upload lewat tombol di atas.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-gold-400/15"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.gambar} alt={item.judul} className="h-40 w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="line-clamp-2 font-body text-xs text-white">{item.judul}</p>
                <button
                  onClick={() => handleDelete(item)}
                  className="mt-2 flex w-fit items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-500/20 px-3 py-1.5 text-[11px] text-rose-200 transition-colors hover:bg-rose-500/40"
                >
                  <Trash2 size={12} />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
