import { prisma } from "@/lib/prisma";
import { articles as fallbackArticles, type Berita } from "@/lib/berita";
import { programs as fallbackPrograms, type ProgramKerja } from "@/lib/program-kerja";

/**
 * Data layer SMFT UNDIP.
 * Seluruh fungsi mencoba membaca dari database (Prisma) dan otomatis
 * kembali ke data statis bila database belum dikonfigurasi / bermasalah,
 * sehingga website tetap bisa dibangun dan ditampilkan tanpa koneksi DB.
 */

function mapBerita(row: {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
}): Berita {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    date: row.date,
  };
}

function mapProgram(row: {
  id: number;
  title: string;
  category: string;
  status: "Selesai" | "Berjalan" | "Segera";
  desc: string;
  periode: string | null;
}): ProgramKerja {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    status: row.status,
    desc: row.desc,
    periode: row.periode ?? undefined,
  };
}

export async function getBeritaList(): Promise<Berita[]> {
  try {
    const rows = await prisma.berita.findMany({ orderBy: { id: "desc" } });
    if (rows.length === 0) return fallbackArticles;
    return rows.map(mapBerita);
  } catch {
    return fallbackArticles;
  }
}

export async function getBeritaById(id: number): Promise<Berita | undefined> {
  try {
    const row = await prisma.berita.findUnique({ where: { id } });
    // Database aktif tapi baris tidak ada → kembalikan undefined (404),
    // JANGAN kembali ke data statis agar tidak muncul "konten hantu".
    return row ? mapBerita(row) : undefined;
  } catch {
    // Database tidak bisa diakses → fallback ke data statis.
    return fallbackArticles.find((a) => a.id === id);
  }
}

export async function getProgramKerjaList(): Promise<ProgramKerja[]> {
  try {
    const rows = await prisma.programKerja.findMany({ orderBy: { id: "asc" } });
    if (rows.length === 0) return fallbackPrograms;
    return rows.map(mapProgram);
  } catch {
    return fallbackPrograms;
  }
}
