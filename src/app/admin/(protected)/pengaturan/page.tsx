"use client";

import { useState } from "react";
import { KeyRound, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

export default function AdminPengaturanPage() {
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (next.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }
    if (next !== confirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Gagal mengganti password.");
        return;
      }
      setCurrent("");
      setNext("");
      setConfirm("");
      toast.success("Password berhasil diganti.");
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gold-400/20 bg-perlemen-900 p-3 pr-11 text-white outline-none transition-colors focus:border-gold-400";
  const labelClass = "mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300";

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
          Keamanan
        </p>
        <h1 className="mt-2 font-heading text-3xl text-white">Pengaturan</h1>
        <p className="mt-2 font-body text-sm text-white/50">
          Ganti password akun admin. Password baru langsung berlaku untuk login berikutnya.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass space-y-5 rounded-xl2 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300">
            <KeyRound size={20} />
          </span>
          <div>
            <p className="font-heading text-base text-white">Ganti Password</p>
            <p className="text-xs text-white/40">Minimal 8 karakter</p>
          </div>
        </div>

        <div>
          <label htmlFor="set-current" className={labelClass}>Password Saat Ini</label>
          <div className="relative">
            <input
              id="set-current"
              type={show ? "text" : "password"}
              className={inputClass}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
              aria-label="Tampilkan password"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="set-next" className={labelClass}>Password Baru</label>
          <input
            id="set-next"
            type={show ? "text" : "password"}
            className={inputClass}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="set-confirm" className={labelClass}>Konfirmasi Password Baru</label>
          <input
            id="set-confirm"
            type={show ? "text" : "password"}
            className={inputClass}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-300">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-perlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {saving ? "Menyimpan..." : "Simpan Password Baru"}
        </button>
      </form>
    </div>
  );
}
