"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_45%),linear-gradient(135deg,_#09090b_0%,_#18181b_45%,_#09090b_100%)]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
      <div className="absolute h-72 w-72 rounded-full border border-gold-400/10" />
      <div className="absolute h-96 w-96 rounded-full border border-gold-400/10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center rounded-[2rem] border border-gold-400/25 bg-parlemen-900/70 px-8 py-10 shadow-[0_0_60px_rgba(212,175,55,0.16)] backdrop-blur-xl"
      >
        <div className="relative mb-7 flex h-40 w-40 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-gold-400/25"
            animate={{ rotate: 360, scale: [1, 1.06, 1] }}
            transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-gold-400/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-gold-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-gold-400/15 blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
              filter: [
                "drop-shadow(0 0 6px rgba(212,175,55,0.25))",
                "drop-shadow(0 0 24px rgba(212,175,55,0.6))",
                "drop-shadow(0 0 6px rgba(212,175,55,0.25))",
              ],
            }}
            transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 2.8, repeat: Infinity, ease: "easeInOut" }, filter: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            className="relative"
          >
            <Image
              src="/warnaemas.png"
              alt="Logo Parlemen (Senat Mahasiswa Fakultas Teknik UNDIP)"
              width={96}
              height={96}
              className="h-24 w-24 object-contain"
            />
          </motion.div>
        </div>

        <motion.div
          className="mb-3 h-1.5 w-44 overflow-hidden rounded-full bg-white/10"
          initial={{ width: 0 }}
          animate={{ width: 176 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="font-heading text-sm uppercase tracking-[0.35em] text-gold-300"
        >
          Langkah Nyata, Karya Berdampak
        </motion.p>
      </motion.div>
    </motion.div>
  );
}