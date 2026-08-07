"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const misi = [
  "Membangun nilai akuntabilitas organisasi melalui peningkatan kinerja anggota dalam menjalankan fungsi di Senat Mahasiswa Fakultas Teknik.",
  "Mengoptimalkan komunikasi serta menjalin hubungan yang harmonis dengan seluruh organisasi kemahasiswaan di lingkungan Fakultas Teknik.",
  "Mengoptimalkan internalisasi nilai-nilai SMFT melalui pengembangan kapasitas anggota guna meningkatkan citra organisasi serta memastikan pelaksanaan empat fungsi Senat sesuai kebutuhan mahasiswa Fakultas Teknik.",
];

export default function Vision() {
  return (
    <section id="visi-misi" className="relative overflow-hidden bg-parlemen-900 py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-gold-glow transform-gpu" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Visi &amp; Misi
          </p>
          <h2 className="mt-4 font-heading text-2xl leading-snug text-white md:text-4xl">
            Arah gerak Kabinet Langkah Karya
          </h2>
          <div className="divider-gold my-6 w-24" />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Panel Visi */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass flex flex-col justify-between gap-10 rounded-[1.75rem] p-8 md:p-10"
          >
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.35em] text-gold-300">Visi</p>
              <h3 className="mt-3 font-heading text-xl leading-snug text-white md:text-2xl">
                Menuju parlemen yang bermakna dan berdampak
              </h3>
              <p className="mt-5 font-display text-lg italic leading-relaxed text-white/75 md:text-xl">
                &ldquo;Menjadi Senat Mahasiswa Fakultas Teknik yang akuntabel, sinergis, adaptif,
                dan progresif dalam mewadahi aspirasi serta menjalankan fungsi kelembagaan untuk
                mewujudkan kesejahteraan mahasiswa Fakultas Teknik.&rdquo;
              </p>
            </div>

            {/* Visual logo dengan lingkaran berputar */}
            <div className="flex justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center md:h-48 md:w-48">
                <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <linearGradient id="visionGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F5E9C4" />
                      <stop offset="100%" stopColor="#8F7420" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.circle
                      key={i}
                      cx="120"
                      cy="120"
                      r={40 + i * 32}
                      fill="none"
                      stroke="url(#visionGrad)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      initial={{ rotate: 0, opacity: 0 }}
                      whileInView={{ rotate: 360, opacity: 0.6 }}
                      viewport={{ once: true }}
                      transition={{ duration: 3 + i, ease: "linear", repeat: Infinity }}
                      style={{ transformOrigin: "120px 120px" }}
                    />
                  ))}
                </svg>
                <div className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-parlemen-900 shadow-[0_0_20px_rgba(212,175,55,0.3)] md:h-20 md:w-20">
                  <Image
                    src="/parlemen.png"
                    alt="Logo Parlemen (Senat)"
                    width={55}
                    height={55}
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel Misi */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass rounded-[1.75rem] p-8 md:p-10"
          >
            <p className="font-heading text-xs uppercase tracking-[0.35em] text-gold-300">Misi</p>
            <ol className="mt-6 space-y-7">
              {misi.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 font-heading text-sm text-gold-300">
                    {i + 1}
                  </span>
                  <p className="pt-1 font-body text-sm leading-relaxed text-white/75 md:text-base">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
