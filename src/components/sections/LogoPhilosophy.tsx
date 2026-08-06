"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    image: "/gerigi.png",
    title: "Gerigi",
    body: "Melambangkan seluruh organisasi kemahasiswaan Fakultas Teknik — BEM FT, 5 Unit Pengembangan Keilmuan, dan 12 Himpunan Mahasiswa Departemen — yang saling terhubung sebagai satu sistem yang bergerak bersama membangun Fakultas Teknik.",
  },
  {
    image: "/tiga.png",
    title: "Tiga Pilar",
    body: "Terinspirasi arsitektur Yunani dan Romawi Kuno sebagai simbol parlemen: tempat berkumpulnya wakil mahasiswa untuk merumuskan kebijakan. Melambangkan Integritas, Kebijaksanaan, dan Tanggung Jawab.",
  },
  {
    image: "/panah.png",
    title: "Panah",
    body: "Melambangkan keberanian meninggalkan titik awal menuju tujuan yang lebih tinggi — komitmen menjadi parlemen yang aktif menciptakan perubahan. Empat pecahan panah merepresentasikan Legislasi, Pengawasan, Penganggaran, dan Advokasi.",
  },
  {
    image: "/warnaemas.png",
    title: "Warna Emas",
    body: "Melambangkan kehormatan, kualitas, integritas, kepemimpinan, serta semangat pengabdian kepada mahasiswa Fakultas Teknik.",
  },
];

export default function LogoPhilosophy() {
  return (
    <section className="bg-perlemen-900 py-28">
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
              {/* Tempat Gambar */}
              <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold-400 bg-perlemen-900 shadow-gold-sm transition-transform hover:scale-110">
                <Image 
                  src={s.image} 
                  alt={s.title} 
                  width={50} 
                  height={50} 
                  className="object-contain"
                />
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