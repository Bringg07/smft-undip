"use client";

import { motion } from "framer-motion";

const misi = [
  "Membangun nilai akuntabilitas organisasi melalui peningkatan kinerja anggota dalam menjalankan fungsi di Senat Mahasiswa Fakultas Teknik.",
  "Mengoptimalkan komunikasi serta menjalin hubungan yang harmonis dengan seluruh organisasi kemahasiswaan di lingkungan Fakultas Teknik.",
  "Mengoptimalkan internalisasi nilai-nilai SMFT melalui pengembangan kapasitas anggota guna meningkatkan citra organisasi serta memastikan pelaksanaan empat fungsi Senat sesuai kebutuhan mahasiswa Fakultas Teknik.",
];

export default function Mission() {
  return (
    <section className="relative bg-perlemen-950 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs uppercase tracking-[0.4em] text-gold-300"
        >
          Misi
        </motion.p>

        <div className="relative mt-14 space-y-10 pl-10">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold-400/70 via-gold-400/30 to-transparent" />
          {misi.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <span className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold-400 bg-perlemen-950" />
              <p className="font-body text-base leading-relaxed text-white/75 md:text-lg">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
