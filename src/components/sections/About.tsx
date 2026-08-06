"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12, label: "Himpunan Mahasiswa Departemen" },
  { value: 5, label: "Unit Pengembangan Keilmuan" },
  { value: 1, label: "BEM Fakultas" },
  { value: 1, label: "Lembaga Parlemen Mahasiswa" },
];

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
    <span ref={ref} className="font-heading text-5xl text-gold-gradient md:text-6xl">
      {display}
    </span>
  );
}

export default function About() {
  return (
    <section id="tentang" className="relative bg-perlemen-950 py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300"
        >
          Tentang Kami
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-heading text-2xl text-white md:text-4xl"
        >
          Senat Mahasiswa Fakultas Teknik UNDIP
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl font-body text-base leading-relaxed text-white/70 md:text-lg"
        >
          Senat Mahasiswa Fakultas Teknik Universitas Diponegoro merupakan lembaga legislatif
          mahasiswa yang menjalankan fungsi representasi, legislasi, pengawasan, penganggaran,
          dan advokasi guna mewadahi aspirasi mahasiswa Fakultas Teknik serta mendorong tata
          kelola organisasi kemahasiswaan yang akuntabel, sinergis, adaptif, progresif, dan
          berdampak.
        </motion.p>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass rounded-xl2 px-4 py-8"
            >
              <Counter to={s.value} />
              <p className="mt-3 font-body text-xs leading-snug text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
