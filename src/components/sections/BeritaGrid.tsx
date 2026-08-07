"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Berita } from "@/lib/berita";

const PER_PAGE = 6;

const categoryStyles: Record<string, string> = {
  "Berita Utama": "border-gold-400/40 bg-gold-400/15 text-gold-300",
  Kegiatan: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Pengumuman: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  Legislasi: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  Advokasi: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function BeritaGrid({ articles }: { articles: Berita[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
    );
  }, [articles, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  if (articles.length === 0) {
    return (
      <p className="py-20 text-center font-body text-white/50">
        Belum ada berita. Silakan kembali lagi nanti.
      </p>
    );
  }

  return (
    <div>
      {/* Pencarian */}
      <div className="relative mx-auto mb-10 max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Cari berita..."
          className="w-full rounded-full border border-gold-400/25 bg-perlemen-900/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold-400"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center font-body text-white/50">
          Tidak ada berita yang cocok dengan “{search}”.
        </p>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((article, i) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Navigasi halaman">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-gold-300 transition-colors hover:bg-gold-400/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition-all ${
                    n === currentPage
                      ? "bg-gold-400 text-perlemen-950 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      : "border border-gold-400/30 text-gold-300 hover:bg-gold-400/10"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Halaman berikutnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-gold-300 transition-colors hover:bg-gold-400/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          )}

          <p className="mt-6 text-center font-body text-xs text-white/35">
            Menampilkan {visible.length} dari {filtered.length} berita
            {search ? ` (hasil pencarian “${search}”)` : ""}
          </p>
        </>
      )}
    </div>
  );
}
