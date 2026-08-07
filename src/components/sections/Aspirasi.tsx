"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

  return (
    <section id="aspirasi" className="py-20 bg-perlemen-950 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading text-white">Sampaikan Aspirasi</h2>
          <p className="text-white/60 mt-2">Suara Anda adalah langkah kami untuk berkarya.</p>
        </div>

        {status === 'success' ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center p-10 bg-gold-400/10 border border-gold-400/20 rounded-2xl">
            <h3 className="text-gold-400 text-xl font-heading">Terima Kasih!</h3>
            <p className="text-white/80 mt-2">Aspirasi Anda telah diterima dan akan segera kami tindak lanjuti.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-6">
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
                  className="w-full bg-perlemen-900 border border-gold-400/20 rounded-lg p-3 text-white focus:border-gold-400 outline-none"
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
                  className="w-full bg-perlemen-900 border border-gold-400/20 rounded-lg p-3 text-white focus:border-gold-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="aspirasi-tujuan" className="mb-2 block font-body text-xs uppercase tracking-[0.2em] text-gold-300">
                Tujuan Aspirasi
              </label>
              <select id="aspirasi-tujuan" name="tujuan" className="w-full bg-perlemen-900 border border-gold-400/20 rounded-lg p-3 text-white focus:border-gold-400 outline-none">
                <option value="Umum">Tujuan Aspirasi (Komisi/Badan)</option>
                <option value="Komisi 1">Komisi 1</option>
                <option value="Komisi 2">Komisi 2</option>
                <option value="Badan Advokasi">Badan Advokasi</option>
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
                className="w-full bg-perlemen-900 border border-gold-400/20 rounded-lg p-3 text-white focus:border-gold-400 outline-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-gold-400 text-perlemen-950 font-bold py-3 rounded-lg hover:bg-gold-300 transition-all disabled:opacity-50"
            >
              {status === 'submitting' ? "Mengirim..." : "Kirim Aspirasi"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
