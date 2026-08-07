"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type AnimKind = "spin" | "float" | "breathe" | "gleam";

const steps: Array<{ image: string; title: string; anim?: AnimKind; body: string }> = [
  {
    image: "/gerigi.png",
    title: "Gerigi",
    anim: "spin",
    body: "Melambangkan seluruh organisasi kemahasiswaan Fakultas Teknik — BEM FT, 5 Unit Pengembangan Keilmuan, dan 12 Himpunan Mahasiswa Departemen — yang saling terhubung sebagai satu sistem yang bergerak bersama membangun Fakultas Teknik.",
  },
  {
    image: "/tiga.png",
    title: "Tiga Pilar",
    anim: "breathe",
    body: "Terinspirasi arsitektur Yunani dan Romawi Kuno sebagai simbol parlemen: tempat berkumpulnya wakil mahasiswa untuk merumuskan kebijakan. Melambangkan Integritas, Kebijaksanaan, dan Tanggung Jawab.",
  },
  {
    image: "/panah.png",
    title: "Panah",
    anim: "float",
    body: "Melambangkan keberanian meninggalkan titik awal menuju tujuan yang lebih tinggi — komitmen menjadi parlemen yang aktif menciptakan perubahan. Empat pecahan panah merepresentasikan Legislasi, Pengawasan, Penganggaran, dan Advokasi.",
  },
  {
    image: "/warnaemas.png",
    title: "Warna Emas",
    anim: "gleam",
    body: "Melambangkan kehormatan, kualitas, integritas, kepemimpinan, serta semangat pengabdian kepada mahasiswa Fakultas Teknik.",
  },
];

// Animasi khas untuk tiap elemen logo (dimatikan jika user memilih reduced motion)
function EmblemMotion({ anim, children }: { anim?: AnimKind; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const base = "flex h-full w-full items-center justify-center";

  if (reduce || !anim) {
    return <div className={base}>{children}</div>;
  }

  switch (anim) {
    case "spin":
      return (
        <motion.div
          className={base}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          {children}
        </motion.div>
      );
    case "float":
      return (
        <motion.div
          className={base}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      );
    case "breathe":
      return (
        <motion.div
          className={base}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      );
    case "gleam":
      return (
        <motion.div
          className={base}
          animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      );
  }
}

export default function LogoPhilosophy() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-parlemen-900 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs uppercase tracking-[0.4em] text-gold-300"
        >
          Filosofi Logo
        </motion.p>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4">
          {/* Garis penghubung disesuaikan posisinya agar pas di tengah gambar */}
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Tempat Gambar + glow emas berdenyut */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-2.5 rounded-full bg-gold-400/25 blur-xl"
                  animate={reduce ? { opacity: 0.4 } : { opacity: [0.25, 0.55, 0.25] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gold-400 bg-parlemen-900 shadow-gold-sm transition-transform hover:scale-110">
                  <EmblemMotion anim={s.anim}>
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={50}
                      height={50}
                      className="object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]"
                    />
                  </EmblemMotion>
                </div>
              </div>

              <h3 className="mt-5 font-heading text-lg text-white">{s.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-white/60">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
