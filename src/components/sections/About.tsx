"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12, label: "Himpunan Mahasiswa Departemen" },
  { value: 5, label: "Unit Pengembangan Keilmuan" },
  { value: 1, label: "BEM Fakultas" },
  { value: 1, label: "Lembaga Parlemen Mahasiswa" },
];

const fungsi = ["Representasi", "Legislasi", "Pengawasan", "Penganggaran", "Advokasi"];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-heading text-4xl text-gold-gradient md:text-5xl">
      {display}
    </span>
  );
}

export default function About() {
  return (
    <section id="tentang" className="relative bg-parlemen-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Kolom pengantar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Tentang Kami
            </p>
            <h2 className="mt-4 font-heading text-2xl leading-snug text-white md:text-4xl">
              Lembaga legislatif mahasiswa Fakultas Teknik UNDIP
            </h2>
            <div className="divider-gold my-6 w-24" />
            <p className="font-body text-base leading-relaxed text-white/70 md:text-lg">
              Senat Mahasiswa Fakultas Teknik Universitas Diponegoro merupakan lembaga legislatif
              mahasiswa. Lima fungsi utama kami — representasi, legislasi, pengawasan, penganggaran,
              dan advokasi — dijalankan untuk menampung aspirasi mahasiswa Fakultas Teknik serta
              menjaga tata kelola organisasi kemahasiswaan yang sehat dan terbuka.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {fungsi.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-gold-400/20 bg-gold-400/5 px-3 py-1 font-body text-[11px] uppercase tracking-[0.2em] text-gold-200"
                >
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kolom statistik */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:sticky lg:top-28"
          >
            <div className="divide-y divide-gold-400/10 border-y border-gold-400/10">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 py-6">
                  <Counter to={s.value} />
                  <p className="text-right font-body text-sm leading-snug text-white/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
