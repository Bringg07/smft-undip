"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// Mendefinisikan struktur data untuk partikel
interface ParticleData {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

function Particles() {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 6,
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-300/70 animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: "0 0 8px rgba(212,175,55,0.8)",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-parlemen-gradient noise-overlay pt-24 pb-24"
    >
      {/* ambient glow — pakai radial-gradient (ringan) tanpa filter blur yang berat */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-glow animate-pulse-glow transform-gpu" />
      <Particles />

      {/* Latar belakang: gerigi parlemen yang ditonjolkan dengan animasi */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gerigi utama — lebih besar & lebih terlihat, berputar dengan denyut cahaya */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[480px] w-[480px] md:h-[820px] md:w-[820px] transform-gpu"
          >
            {/* Glow emas berdenyut di balik gerigi — radial-gradient ringan, tanpa blur */}
            <motion.div
              className="absolute -inset-10 rounded-full bg-gold-glow transform-gpu"
              animate={reduce ? { opacity: 0.3 } : { opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Gerigi utama berputar perlahan */}
            <motion.div
              className="absolute inset-0 transform-gpu"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
              style={{
                WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
                maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
              }}
            >
              <Image
                src="/parlemen.png"
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 820px, 480px"
                className="object-contain opacity-[0.16]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Gerigi sekunder — kanan atas, berputar berlawanan arah */}
        <motion.div
          className="absolute -right-20 -top-20 h-64 w-64 md:h-96 md:w-96 transform-gpu"
          animate={reduce ? {} : { rotate: -360 }}
          transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
          style={{
            WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 68%)",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 68%)",
          }}
        >
          <Image
            src="/gerigi.png"
            alt=""
            fill
            sizes="(min-width: 768px) 384px, 256px"
            className="object-contain opacity-[0.12]"
          />
        </motion.div>

        {/* Gerigi sekunder — kiri bawah, berputar searah lambat */}
        <motion.div
          className="absolute -bottom-24 -left-24 h-72 w-72 md:h-[26rem] md:w-[26rem] transform-gpu"
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          style={{
            WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 68%)",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 68%)",
          }}
        >
          <Image
            src="/gerigi.png"
            alt=""
            fill
            sizes="(min-width: 768px) 416px, 288px"
            className="object-contain opacity-[0.12]"
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        
        {/* Logo Section di Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          <Image
            src="/senat.png"
            alt="Logo Senat"
            width={110}
            height={110}
            className="object-contain"
          />
          <Image
            src="/parlemen.png"
            alt="Logo Kabinet"
            width={110}
            height={110}
            className="object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 font-heading text-xs uppercase tracking-[0.4em] text-gold-300"
        >
          Kabinet Langkah Karya
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-4 max-w-4xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-6xl"
        >
          SENAT MAHASISWA
          <br />
          <span className="text-gold-gradient">FAKULTAS TEKNIK</span>
          <br />
          UNIVERSITAS DIPONEGORO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 max-w-xl font-display text-xl italic text-white/70 md:text-2xl"
        >
          &ldquo;Parlemen Bermakna, Langkah Nyata, Karya Berdampak.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#tentang"
            className="rounded-full bg-gold-400 px-8 py-3 font-body text-sm font-medium text-parlemen-900 shadow-gold-sm transition-transform hover:scale-105"
          >
            Jelajahi Website
          </a>
          <a
            href="/program-kerja"
            className="rounded-full border border-gold-400/50 px-8 py-3 font-body text-sm font-medium text-gold-200 transition-all hover:border-gold-300 hover:bg-gold-400/10"
          >
            Program Kerja
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 z-10 flex flex-col items-center gap-2 text-gold-300/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-body text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}