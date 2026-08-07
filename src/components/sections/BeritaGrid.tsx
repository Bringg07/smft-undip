"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Berita } from "@/lib/berita";

const categoryStyles: Record<string, string> = {
  "Berita Utama": "border-gold-400/40 bg-gold-400/15 text-gold-300",
  Kegiatan: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Pengumuman: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  Legislasi: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  Advokasi: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function BeritaGrid({ articles }: { articles: Berita[] }) {
  if (articles.length === 0) {
    return (
      <p className="py-20 text-center font-body text-white/50">
        Belum ada berita. Silakan kembali lagi nanti.
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
          className="glass group flex flex-col rounded-xl2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold-sm"
        >
          {article.image ? (
            <div className="relative -mx-1 overflow-hidden rounded-xl border border-gold-400/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.title}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-3 top-3 rounded-full border border-gold-400/40 bg-gold-400/15 px-3 py-1 text-[10px] uppercase tracking-widest text-gold-300 backdrop-blur-md">
                {article.category}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${
                  categoryStyles[article.category] ?? categoryStyles["Berita Utama"]
                }`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <CalendarDays size={13} />
                {article.date}
              </span>
            </div>
          )}

          <h2 className="mt-4 flex-grow font-heading text-xl leading-snug text-white transition-colors group-hover:text-gold-300">
            <Link href={`/berita/${article.id}`}>{article.title}</Link>
          </h2>

          <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
            {article.excerpt}
          </p>

          <Link
            href={`/berita/${article.id}`}
            className="mt-6 inline-flex items-center gap-2 border-b border-gold-400/40 pb-0.5 font-body text-xs font-semibold text-gold-400 transition-all hover:gap-3 hover:border-gold-400"
          >
            Baca Selengkapnya
            <ArrowRight size={14} />
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
