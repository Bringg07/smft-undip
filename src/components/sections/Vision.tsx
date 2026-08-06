"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Vision() {
  return (
    <section id="visi-misi" className="relative overflow-hidden bg-perlemen-900 py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-gold-glow blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">Visi</p>
          <h2 className="mt-4 font-heading text-2xl leading-snug text-white md:text-3xl">
            Parlemen yang Akuntabel, Sinergis, Adaptif, dan Progresif
          </h2>
          <div className="divider-gold my-6 w-24" />
          <p className="font-display text-xl italic leading-relaxed text-white/75 md:text-2xl">
            &ldquo;Menjadi Senat Mahasiswa Fakultas Teknik yang akuntabel, sinergis, adaptif,
            dan progresif dalam mewadahi aspirasi serta menjalankan fungsi kelembagaan untuk
            mewujudkan kesejahteraan mahasiswa Fakultas Teknik.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass shadow-gold-lg relative flex aspect-square items-center justify-center rounded-xl2"
        >
          {/* Efek Garis Putus-putus Berputar */}
          <svg viewBox="0 0 240 240" className="h-56 w-56 md:h-72 md:w-72" aria-hidden>
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

          {/* Logo Parlemen di Tengah (Menggantikan bulatan emas padat sebelumnya) */}
          <div className="absolute flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-perlemen-900 border border-gold-400/40 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Image
              src="/parlemen.png"
              alt="Logo Parlemen (Senat)"
              width={65}
              height={65}
              className="object-contain drop-shadow-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}