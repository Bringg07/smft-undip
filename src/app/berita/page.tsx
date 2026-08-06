"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

// Contoh data berita (bisa Anda update nanti)
const articles = [
  { 
    id: 1, 
    title: "Pelantikan Pengurus Baru Senat Mahasiswa", 
    date: "25 Juli 2026", 
    category: "Berita Utama", 
    excerpt: "Senat Mahasiswa FT UNDIP resmi melantik pengurus periode 2026/2027 dengan semangat baru." 
  },
  { 
    id: 2, 
    title: "Dialog Terbuka: Aspirasi Mahasiswa Teknik", 
    date: "20 Juli 2026", 
    category: "Kegiatan", 
    excerpt: "Sesi diskusi interaktif antara mahasiswa dan birokrasi fakultas terkait fasilitas kampus." 
  },
  { 
    id: 3, 
    title: "Penerimaan Staf Ahli Gelombang 2", 
    date: "15 Juli 2026", 
    category: "Pengumuman", 
    excerpt: "Kesempatan bagi mahasiswa teknik untuk bergabung menjadi bagian dari kontributor parlemen." 
  },
];

export default function BeritaPage() {
  return (
    <main className="min-h-screen bg-perlemen-950">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">Warta Senat</p>
          <h1 className="mt-4 text-4xl font-heading text-white">Berita & Update</h1>
        </div>

        {/* List Berita */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col p-6 rounded-2xl bg-perlemen-900 border border-gold-400/20 hover:border-gold-400 transition-all"
            >
              <span className="text-[10px] uppercase text-gold-400 tracking-widest">{article.category}</span>
              <h3 className="text-white font-heading text-xl mt-3 group-hover:text-gold-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-white/60 text-sm mt-3 flex-grow">{article.excerpt}</p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-white/40">{article.date}</span>
                <button className="text-gold-400 text-xs font-semibold hover:underline">Baca Selengkapnya</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}