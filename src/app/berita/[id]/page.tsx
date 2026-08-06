import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getBeritaById, getBeritaList } from "@/lib/data";

export async function generateStaticParams() {
  const articles = await getBeritaList();
  return articles.map((article) => ({ id: String(article.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getBeritaById(Number(id));

  if (!article) return { title: "Berita Tidak Ditemukan" };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getBeritaById(Number(id));

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-perlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-gold-glow blur-3xl" />

        <article className="relative mx-auto max-w-3xl px-6 pb-20 pt-32">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 font-body text-sm text-gold-400 transition-all hover:gap-3"
          >
            <ArrowLeft size={16} />
            Kembali ke Berita
          </Link>

          <div className="glass mt-8 rounded-xl2 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="rounded-full border border-gold-400/40 bg-gold-400/15 px-3 py-1 uppercase tracking-widest text-gold-300">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/40">
                <CalendarDays size={13} />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 text-white/40">
                <User size={13} />
                {article.author}
              </span>
            </div>

            <h1 className="mt-6 font-heading text-3xl leading-tight text-white md:text-4xl">
              {article.title}
            </h1>

            <div className="divider-gold my-8 w-24" />

            <div className="space-y-6">
              {article.content.map((paragraph, i) => (
                <p key={i} className="font-body text-base leading-relaxed text-white/75 md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 px-8 py-3 font-body text-sm font-medium text-gold-200 transition-all hover:border-gold-300 hover:bg-gold-400/10"
            >
              <ArrowLeft size={16} />
              Berita Lainnya
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
