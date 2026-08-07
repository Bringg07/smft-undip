"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Search } from "lucide-react";
import { programCategories } from "@/lib/program-kerja";
import { useToast } from "@/components/admin/Toast";

interface ProgramItem {
  id: number;
  title: string;
  category: string;
  status: "Selesai" | "Berjalan" | "Segera";
  desc: string;
  periode?: string | null;
}

const statusOptions = ["Berjalan", "Selesai", "Segera"] as const;

interface ProgramForm {
  title: string;
  category: string;
  status: ProgramItem["status"];
  desc: string;
  periode: string;
}

const emptyForm: ProgramForm = {
  title: "",
  category: "Komisi 1",
  status: "Berjalan",
  desc: "",
  periode: "",
};

const statusColor: Record<string, string> = {
  Selesai: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Berjalan: "border-gold-400/40 bg-gold-400/15 text-gold-300",
  Segera: "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

export default function AdminProgramKerjaPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<ProgramItem[]>([]);

  // Opsi kategori = daftar standar + kategori yang sudah ada di database
  const categoryOptions = Array.from(
    new Set([
      ...programCategories.filter((c) => c !== "Semua"),
      ...items.map((i) => i.category),
    ])
  );
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProgramItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/program-kerja");
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

  const openEdit = (item: ProgramItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      status: item.status,
      desc: item.desc,
      periode: item.periode ?? "",
    });
    setShowForm(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        editing ? `/api/program-kerja/${editing.id}` : "/api/program-kerja",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            category: form.category,
            status: form.status,
            desc: form.desc,
            periode: form.periode || null,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan program kerja.");
        return;
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditing(null);
      await load();
      router.refresh();
      toast.success(editing ? "Program kerja diperbarui." : "Program kerja ditambahkan.");
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: ProgramItem) => {
    if (!confirm(`Hapus program "${item.title}"?`)) return;

    const res = await fetch(`/api/program-kerja/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      router.refresh();
      toast.success("Program kerja berhasil dihapus.");
    } else {
      toast.error("Gagal menghapus program kerja.");
    }
  };

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass =
    "w-full rounded-lg border border-gold-400/20 bg-parlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400";
  const labelClass = "mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Konten
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Kelola Program Kerja</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-parlemen-950 transition-all hover:bg-gold-300"
        >
          <Plus size={16} />
          Tambah Program
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="glass mb-10 space-y-5 rounded-[1.75rem] p-6 md:p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-white">
              {editing ? "Ubah Program Kerja" : "Tambah Program Kerja"}
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
            <label htmlFor="p-title" className={labelClass}>Nama Program</label>
            <input
              id="p-title"
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="p-category" className={labelClass}>Unit / Komisi</label>
              <select
                id="p-category"
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="p-status" className={labelClass}>Status</label>
              <select
                id="p-status"
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as ProgramItem["status"] })
                }
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="p-periode" className={labelClass}>Periode (opsional)</label>
              <input
                id="p-periode"
                className={inputClass}
                value={form.periode}
                onChange={(e) => setForm({ ...form, periode: e.target.value })}
                placeholder="cth: Triwulan III"
              />
            </div>
          </div>

          <div>
            <label htmlFor="p-desc" className={labelClass}>Deskripsi</label>
            <textarea
              id="p-desc"
              className={inputClass}
              rows={3}
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
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
              className="rounded-full border border-parlemen-700 px-6 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-parlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Tambah Program"}
            </button>
          </div>
        </form>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama program atau unit..."
            className="w-full rounded-full border border-gold-400/20 bg-parlemen-900 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-gold-400"
          />
        </div>
        <span className="font-body text-xs text-white/40">{filtered.length} program</span>
      </div>

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat program kerja...</p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-white/40">
          {search ? "Tidak ada program yang cocok dengan pencarian." : "Belum ada program kerja. Klik tombol “Tambah Program” di atas untuk membuat yang pertama."}
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
                    {item.category}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] ${statusColor[item.status]}`}
                  >
                    {item.status}
                  </span>
                  {item.periode && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {item.periode}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 truncate font-heading text-lg text-white">{item.title}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-white/50">{item.desc}</p>
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
