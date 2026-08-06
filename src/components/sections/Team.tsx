"use client";

import { motion } from "framer-motion";
import { User, Users } from "lucide-react";

// 1. Pimpinan
const leadership = [
  { name: "Nama Ketua", role: "Ketua Senat" },
  { name: "Nama Wakil 1", role: "Wakil Ketua" },
  { name: "Nama Wakil 2", role: "Wakil Ketua" },
];

// 2. Sekretariat
const secretariat = [{ name: "Nama Sekjen", role: "Sekretaris Jenderal" }];

// 3. Badan & Komisi (Ketua-nya saja untuk tampilan utama)
const badanList = [
  { name: "Nama Ketua", role: "Ketua BURT" },
  { name: "Nama Ketua", role: "Ketua BKAP" },
  { name: "Nama Ketua", role: "Ketua Badan Legislatif" },
  { name: "Nama Ketua", role: "Ketua Badan Advokasi" },
  { name: "Nama Ketua", role: "Ketua Badan Anggaran" },
  { name: "Nama Ketua", role: "Ketua Badan Pengembangan Staff" },
];

const komisiList = [
  { name: "Nama Ketua", role: "Ketua Komisi 1" },
  { name: "Nama Ketua", role: "Ketua Komisi 2" },
  { name: "Nama Ketua", role: "Ketua Komisi 3" },
  { name: "Nama Ketua", role: "Ketua Komisi 4" },
];

export default function Team() {
  return (
    <section id="struktur" className="bg-perlemen-950 py-28 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-20">
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">Struktur Organisasi</p>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl">Pengurus Senat</h2>
        </div>

        {/* PIMPINAN */}
        <div className="flex flex-wrap justify-center gap-12 mb-20">
          {leadership.map((m, i) => (
            <TeamCard key={i} name={m.name} role={m.role} size="large" />
          ))}
        </div>

        {/* SEKRETARIAT */}
        <div className="flex justify-center mb-20">
           {secretariat.map((m, i) => (
            <TeamCard key={i} name={m.name} role={m.role} size="medium" />
          ))}
        </div>

        {/* BADAN & KOMISI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...badanList, ...komisiList].map((m, i) => (
            <TeamCard key={i} name={m.name} role={m.role} size="small" showSubInfo />
          ))}
        </div>
      </div>
    </section>
  );
}

// Komponen Card agar kode lebih bersih
function TeamCard({ name, role, size, showSubInfo }: { name: string, role: string, size: 'large' | 'medium' | 'small', showSubInfo?: boolean }) {
  const sizeClasses = {
    large: "h-36 w-36",
    medium: "h-28 w-28",
    small: "h-20 w-20"
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center">
      <div className={`flex ${sizeClasses[size]} items-center justify-center rounded-full border border-gold-400/30 bg-perlemen-900 shadow-gold-sm`}>
        <User size={size === 'large' ? 48 : 32} className="text-gold-400" />
      </div>
      <h3 className="mt-4 font-heading text-md">{name}</h3>
      <p className="font-body text-xs text-gold-300 uppercase tracking-wider">{role}</p>
      
      {showSubInfo && (
        <div className="mt-2 flex items-center gap-1 text-[10px] text-white/40">
          <Users size={10} />
          <span>Senator & Staf Ahli</span>
        </div>
      )}
    </motion.div>
  );
}