"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Upload, User } from "lucide-react";
import { pengurusCategories } from "@/lib/pengurus";
import { fileToStoredDataUrl } from "@/lib/image";
import { useToast } from "@/components/admin/Toast";

interface PengurusItem {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string;
  urutan: number;
  foto?: string | null;
}

const emptyForm = {
  nama: "",
  jabatan: "",
  kategori: "Pimpinan",
  urutan: 1,
  foto: "",
};

export default function AdminPengurusPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<PengurusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PengurusItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengurus");
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
    setForm({ ...emptyForm, urutan: items.length + 1 });
    setShowForm(true);
    setError(null);
  };

  const openEdit = (item: PengurusItem) => {
    setEditing(item);
    setForm({
      nama: item.nama,
      jabatan: item.jabatan,
      kategori: item.kategori,
      urutan: item.urutan,
      foto: item.foto ?? "",
    });
    setShowForm(true);
    setError(null);
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToStoredDataUrl(file, 600, 0.72);
      setForm((f) => ({ ...f, foto: dataUrl }));
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
    setSaving(true);
    setError(null);

    const payload = {
      nama: form.nama,
      jabatan: form.jabatan,
      kategori: form.kategori,
      urutan: Number(form.urutan) || 0,
      foto: form.foto || null,
    };

    try {
      const res = await fetch(editing ? `/api/pengurus/${editing.id}` : "/api/pengurus", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan pengurus.");
        return;
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditing(null);
      await load();
      router.refresh();
      toast.success(editing ? "Pengurus berhasil diperbarui." : "Pengurus berhasil ditambahkan.");
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: PengurusItem) => {
    if (!confirm(`Hapus pengurus "${item.nama}"?`)) return;
    const res = await fetch(`/api/pengurus/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      router.refresh();
      toast.success("Pengurus berhasil dihapus.");
    } else {
      toast.error("Gagal menghapus pengurus.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gold-400/20 bg-parlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400";
  const labelClass = "mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Kepengurusan
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Kelola Pengurus</h1>
          <p className="mt-2 font-body text-sm text-white/50">
            Data ini tampil pada kartu pimpinan di beranda.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-parlemen-950 transition-all hover:bg-gold-300"
        >
          <Plus size={16} />
          Tambah Pengurus
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass mb-10 space-y-5 rounded-[1.75rem] p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-white">
              {editing ? "Ubah Pengurus" : "Tambah Pengurus Baru"}
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
              <label htmlFor="pgr-nama" className={labelClass}>Nama Lengkap</label>
              <input
                id="pgr-nama"
                className={inputClass}
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="pgr-jabatan" className={labelClass}>Jabatan</label>
              <input
                id="pgr-jabatan"
                className={inputClass}
                value={form.jabatan}
                onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                placeholder="cth: Ketua Senat, Ketua Komisi 1"
                required
              />
            </div>
            <div>
              <label htmlFor="pgr-kategori" className={labelClass}>Kategori</label>
              <select
                id="pgr-kategori"
                className={inputClass}
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              >
                {pengurusCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pgr-urutan" className={labelClass}>Urutan Tampil</label>
              <input
                id="pgr-urutan"
                type="number"
                min={1}
                className={inputClass}
                value={form.urutan}
                onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Foto (opsional)</label>
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gold-400/30 bg-parlemen-900 px-3 py-2.5 text-sm text-white/60 transition-colors hover:border-gold-400 hover:text-gold-300 ${
                uploading ? "opacity-60" : ""
              }`}
            >
              <Upload size={15} />
              {uploading ? "Memproses..." : form.foto ? "Ganti foto" : "Pilih foto"}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={uploading} />
            </label>
            {form.foto && (
              <div className="relative mt-3 inline-block overflow-hidden rounded-full border border-gold-400/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.foto} alt="Pratinjau foto" className="h-28 w-28 object-cover" />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, foto: "" }))}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/90 text-white"
                  title="Hapus foto"
                >
                  <X size={12} />
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
              className="rounded-full border border-parlemen-700 px-6 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-parlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Tambah Pengurus"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat pengurus...</p>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-white/40">Belum ada pengurus. Tambahkan lewat tombol di atas.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                {item.foto ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.foto}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-full border border-gold-400/30 object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-parlemen-900 text-gold-400">
                    <User size={22} />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate font-heading text-base text-white">{item.nama}</p>
                  <p className="text-xs text-white/50">{item.jabatan}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                      Urutan #{item.urutan}
                    </span>
                  </div>
                </div>
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
