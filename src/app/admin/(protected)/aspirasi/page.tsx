"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, RotateCcw, Trash2, Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/admin/Toast";
import { formatTanggalWaktu } from "@/lib/image";

interface AspirasiItem {
  id: number;
  nama: string;
  nim: string;
  tujuan: string;
  pesan: string;
  status: "Baru" | "Ditindaklanjuti";
  createdAt: string;
}

export default function AdminAspirasiPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<AspirasiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/aspirasi");
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

  const toggleStatus = async (item: AspirasiItem) => {
    setBusyId(item.id);
    try {
      const next = item.status === "Baru" ? "Ditindaklanjuti" : "Baru";
      const res = await fetch(`/api/aspirasi/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) {
        await load();
        toast.success(next === "Ditindaklanjuti" ? "Ditandai sebagai ditindaklanjuti." : "Dikembalikan ke status Baru.");
      } else {
        toast.error("Gagal memperbarui aspirasi.");
      }
    } catch {
      toast.error("Terjadi kesalahan koneksi.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (item: AspirasiItem) => {
    if (!confirm(`Hapus aspirasi dari ${item.nama}?`)) return;
    setBusyId(item.id);
    try {
      const res = await fetch(`/api/aspirasi/${item.id}`, { method: "DELETE" });
      if (res.ok) {
        await load();
        toast.success("Aspirasi berhasil dihapus.");
      } else {
        toast.error("Gagal menghapus aspirasi.");
      }
    } catch {
      toast.error("Terjadi kesalahan koneksi.");
    } finally {
      setBusyId(null);
    }
  };

  const baruCount = items.filter((i) => i.status === "Baru").length;

  const filtered = items.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.toLowerCase().includes(search.toLowerCase()) ||
      item.pesan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Kanal Mahasiswa
          </p>
          <h1 className="mt-2 font-heading text-3xl text-white">Aspirasi Masuk</h1>
          <p className="mt-2 font-body text-sm text-white/50">
            Aspirasi yang dikirim mahasiswa dari formulir di beranda.
          </p>
        </div>
        <span className="rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-xs font-medium text-gold-300">
          {baruCount} baru · {items.length} total
        </span>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, NIM, atau isi aspirasi..."
            className="w-full rounded-full border border-gold-400/20 bg-parlemen-900 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-gold-400"
          />
        </div>
      </div>

      {loading ? (
        <p className="py-16 text-center text-white/40">Memuat aspirasi...</p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-white/40">
          {search ? "Tidak ada aspirasi yang cocok." : "Belum ada aspirasi masuk."}
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((item) => (
            <li
              key={item.id}
              className={`glass rounded-xl p-6 transition-colors ${
                item.status === "Baru" ? "border-l-4 border-l-gold-400" : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
                      item.status === "Baru"
                        ? "border-gold-400/40 bg-gold-400/15 text-gold-300"
                        : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="rounded-full border border-parlemen-700 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {item.tujuan}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {formatTanggalWaktu(item.createdAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(item)}
                    disabled={busyId === item.id}
                    className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 px-4 py-2 text-xs text-emerald-300 transition-colors hover:bg-emerald-400/10 disabled:opacity-50"
                  >
                    {busyId === item.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : item.status === "Baru" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <RotateCcw size={13} />
                    )}
                    {item.status === "Baru" ? "Tindak lanjuti" : "Batalkan"}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={busyId === item.id}
                    className="flex items-center gap-1.5 rounded-full border border-rose-400/30 px-4 py-2 text-xs text-rose-300 transition-colors hover:bg-rose-400/10 disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    Hapus
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-heading text-base text-white">
                  {item.nama}{" "}
                  <span className="font-body text-sm text-white/40">· NIM {item.nim}</span>
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/70">
                  {item.pesan}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
