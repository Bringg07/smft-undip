"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { strukturUnits } from "@/lib/struktur";

export default function Aspirasi() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/aspirasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: formData.get("nama"),
          nim: formData.get("nim"),
          tujuan: formData.get("tujuan"),
          pesan: formData.get("pesan"),
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Gagal mengirim pesan. Coba lagi nanti.");
        setStatus('idle');
      }
    } catch {
      setError("Terjadi kesalahan koneksi.");
      setStatus('idle');
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gold-400/20 bg-parlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40";

  return (
    <section id="aspirasi" className="bg-parlemen-950 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Aspirasi Mahasiswa
          </p>
          <h2 className="mt-4 font-heading text-3xl text-white">Sampaikan Aspirasi</h2>
          <p className="mt-3 font-body text-white/60">Aspirasi Anda kami baca satu per satu dan tindak lanjuti melalui komisi terkait.</p>
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass mt-10 rounded-[1.75rem] p-10 text-center"
          >
            <h3 className="font-heading text-xl text-gold-400">Terima Kasih!</h3>
            <p className="mt-2 text-white/80">
              Aspirasi Anda telah diterima dan akan segera kami tindak lanjuti.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="glass mt-10 space-y-6 rounded-[1.75rem] p-8 md:p-10">
            {error && (
              <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="aspirasi-nama" className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-gold-300">
                  Nama Lengkap
                </label>
                <input
                  id="aspirasi-nama"
                  name="nama"
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="aspirasi-nim" className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-gold-300">
                  NIM
                </label>
                <input
                  id="aspirasi-nim"
                  name="nim"
                  type="text"
                  placeholder="NIM"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="aspirasi-tujuan" className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-gold-300">
                Tujuan Aspirasi
              </label>
              <select id="aspirasi-tujuan" name="tujuan" className={inputClass} defaultValue="Umum">
                <option value="Umum">Umum</option>
                {strukturUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="aspirasi-pesan" className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-gold-300">
                Pesan Aspirasi
              </label>
              <textarea
                id="aspirasi-pesan"
                name="pesan"
                placeholder="Tuliskan aspirasi Anda di sini..."
                rows={4}
                required
                className={inputClass}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-xl bg-gold-400 py-3 font-bold text-parlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {status === 'submitting' ? "Mengirim..." : "Kirim Aspirasi"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
