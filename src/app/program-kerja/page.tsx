"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

const programs = [
  { title: "Seminar Keilmuan", category: "Komisi 1", status: "Selesai", desc: "Meningkatkan literasi akademik mahasiswa Teknik." },
  { title: "Advokasi Biaya", category: "Badan Advokasi", status: "Berjalan", desc: "Pendampingan terkait UKT dan fasilitas fakultas." },
  { title: "Langkah Nyata", category: "Badan Pengembangan Staff", status: "Berjalan", desc: "Pelatihan soft skill untuk staf senat." },
  // Tambahkan program lainnya di sini
];

const categories = ["Semua", "Komisi 1", "Komisi 2", "Badan Advokasi", "Badan Pengembangan Staff"];

export default function ProgramKerjaPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filtered = activeTab === "Semua" 
    ? programs 
    : programs.filter(p => p.category === activeTab);

  return (
    <main className="min-h-screen bg-perlemen-950">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-4xl font-heading text-white text-center">Program Kerja</motion.h1>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${activeTab === cat ? 'bg-gold-400 text-perlemen-900 border-gold-400' : 'border-gold-400/30 text-gold-300 hover:border-gold-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List Program */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {filtered.map((p, i) => (
            <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: i * 0.1}} className="p-6 rounded-xl bg-perlemen-900 border border-gold-400/20">
              <span className="text-[10px] uppercase text-gold-400">{p.category}</span>
              <h3 className="text-white font-heading mt-2">{p.title}</h3>
              <p className="text-white/60 text-sm mt-2">{p.desc}</p>
              <div className="mt-4 inline-block px-3 py-1 rounded text-[10px] bg-gold-400/10 text-gold-300 border border-gold-400/20">{p.status}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}