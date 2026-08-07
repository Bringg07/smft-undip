"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Search, Users } from "lucide-react";
import { useToast } from "@/components/admin/Toast";
import { strukturUnits } from "@/lib/struktur";

interface Anggota {
  id: number;
  unit: string;
  nama: string;
  peran: string;
  urutan: number;
}

const emptyForm = {
  unit: strukturUnits[0],
  nama: "",
  peran: "Senator",
  urutan: 1,
};

export default function AdminStrukturPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Anggota | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("Semua");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/struktur");
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

  const openEdit = (item: Anggota) => {
    setEditing(item);
    setForm({ unit: item.unit, nama: item.nama, peran: item.peran, urutan: item.urutan });
    setShowForm(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      unit: form.unit,
      nama: form.nama.trim(),
      peran: form.peran,
      urutan: Number(form.urutan) || 0,
    };

    try {
      const res = await fetch(editing ? `/api/struktur/${editing.id}` : "/api/struktur", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan anggota.");
        return;
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditing(null);
      await load();
      toast.success(editing ? "Anggota berhasil diperbarui." : "Anggota berhasil ditambahkan.");
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Anggota) => {
    if (!confirm(`Hapus ${item.nama} dari ${item.unit}?`)) return;

    const res = await fetch(`/api/struktur/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      toast.success("Anggota berhasil dihapus.");
    } else {
      toast.error("Gagal menghapus anggota.");
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        (unitFilter === "Semua" || item.unit === unitFilter) &&
        (item.nama.toLowerCase().includes(q) || item.peran.toLowerCase().includes(q))
    );
  }, [items, search, unitFilter]);

  const peranCounts = useMemo(() => {
    return items.reduce<Record<string, number>>((acc, item) => {
      acc[item.peran] = (acc[item.peran] || 0) + 1;
      return acc;
    }, {});
  }, [items]);

  const inputClass =
    "w-full rounded-lg border border-gold-400/20 bg-perlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400";
  const labelClass = "mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Organisasi
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Kelola Struktur Organisasi</h1>
          <p className="mt-2 max-w-xl font-body text-sm text-white/60">
            Data senator &amp; staff ahli per badan/komisi. Perubahan langsung tampil di halaman{" "}
            <span className="text-gold-300">/struktur-organisasi</span>.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300"
        >
          <Plus size={16} />
          Tambah Anggota
        </button>
      </div>

      {/* Ringkasan */}
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs text-gold-300">
          Total: {items.length} anggota
        </span>
        {Object.entries(peranCounts).map(([peran, count]) => (
          <span
            key={peran}
            className={`rounded-full border px-4 py-1.5 text-xs ${
              peran === "Senator"
                ? "border-gold-400/30 bg-gold-400/10 text-gold-300"
                : "border-perlemen-400/30 bg-perlemen-400/10 text-perlemen-300"
            }`}
          >
            {peran}: {count}
          </span>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass mb-10 space-y-5 rounded-xl2 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-white">
              {editing ? "Ubah Anggota" : "Tambah Anggota Baru"}
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
              <label htmlFor="s-unit" className={labelClass}>Unit / Badan / Komisi</label>
              <select
                id="s-unit"
                className={inputClass}
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                required
              >
                {strukturUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="s-peran" className={labelClass}>Peran</label>
              <select
                id="s-peran"
                className={inputClass}
                value={form.peran}
                onChange={(e) => setForm({ ...form, peran: e.target.value })}
                required
              >
                <option value="Senator">Senator</option>
                <option value="Staff Ahli">Staff Ahli</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[1fr_140px]">
            <div>
              <label htmlFor="s-nama" className={labelClass}>Nama Lengkap</label>
              <input
                id="s-nama"
                className={inputClass}
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="s-urutan" className={labelClass}>Urutan</label>
              <input
                id="s-urutan"
                type="number"
                min={1}
                className={inputClass}
                value={form.urutan}
                onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
              />
            </div>
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
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Tambahkan"}
            </button>
          </div>
        </form>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau peran..."
            className="w-full rounded-full border border-gold-400/20 bg-perlemen-900 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-gold-400"
          />
        </div>
        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="rounded-full border border-gold-400/20 bg-perlemen-900 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-gold-400"
        >
          <option value="Semua">Semua Unit</option>
          {strukturUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <span className="font-body text-xs text-white/40">{filtered.length} anggota</span>
      </div>

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat anggota...</p>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <Users size={40} className="mx-auto mb-4 text-white/20" />
          <p className="text-white/40">
            {search || unitFilter !== "Semua"
              ? "Tidak ada anggota yang cocok dengan filter."
              : "Belum ada anggota struktur. Klik tombol “Tambah Anggota” di atas."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-xs font-bold text-gold-300">
                  {item.nama
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-base text-white">{item.nama}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${
                        item.peran === "Senator"
                          ? "border-gold-400/40 bg-gold-400/15 text-gold-300"
                          : "border-perlemen-400/30 bg-perlemen-400/10 text-perlemen-300"
                      }`}
                    >
                      {item.peran}
                    </span>
                    <span className="text-[11px] text-white/40">{item.unit}</span>
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
