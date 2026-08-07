import { prisma } from "@/lib/prisma";
import { articles as fallbackArticles, type Berita } from "@/lib/berita";
import { programs as fallbackPrograms, type ProgramKerja } from "@/lib/program-kerja";
import { pengurusList as fallbackPengurus, type Pengurus } from "@/lib/pengurus";
import { anggotaStrukturList as fallbackStruktur, type AnggotaStruktur } from "@/lib/struktur";

/**
 * Data layer SMFT UNDIP.
 * Seluruh fungsi membaca dari database (Prisma) dan hanya kembali ke data
 * statis bila database tidak bisa diakses (belum dikonfigurasi / bermasalah),
 * sehingga website tetap bisa dibangun dan ditampilkan tanpa koneksi DB.
 * Database yang aktif namun kosong TETAP dikembalikan kosong — agar data
 * yang sudah dihapus di admin tidak muncul kembali sebagai data statis.
 */

function mapBerita(row: {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  image: string | null;
}): Berita {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    date: row.date,
    image: row.image,
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
    return rows.map(mapProgram);
  } catch {
    return fallbackPrograms;
  }
}

export interface Aspirasi {
  id: number;
  nama: string;
  nim: string;
  tujuan: string;
  pesan: string;
  status: "Baru" | "Ditindaklanjuti";
  createdAt: Date;
}

export async function getAspirasiList(): Promise<Aspirasi[]> {
  try {
    const rows = await prisma.aspirasi.findMany({ orderBy: { id: "desc" } });
    return rows.map((r) => ({
      id: r.id,
      nama: r.nama,
      nim: r.nim,
      tujuan: r.tujuan,
      pesan: r.pesan,
      status: r.status,
      createdAt: r.createdAt,
    }));
  } catch {
    return [];
  }
}

export async function getPengurusList(): Promise<Pengurus[]> {
  try {
    const rows = await prisma.pengurus.findMany({
      orderBy: [{ urutan: "asc" }, { id: "asc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      nama: r.nama,
      jabatan: r.jabatan,
      kategori: r.kategori,
      urutan: r.urutan,
      foto: r.foto,
    }));
  } catch {
    return fallbackPengurus;
  }
}

export async function getStrukturList(): Promise<AnggotaStruktur[]> {
  try {
    const rows = await prisma.anggotaStruktur.findMany({
      orderBy: [{ urutan: "asc" }, { id: "asc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      unit: r.unit,
      nama: r.nama,
      peran: r.peran,
      urutan: r.urutan,
    }));
  } catch {
    return fallbackStruktur;
  }
}

export interface GaleriItem {
  id: number;
  judul: string;
  gambar: string;
  createdAt: Date;
}

export async function getGaleriList(): Promise<GaleriItem[]> {
  try {
    const rows = await prisma.galeri.findMany({ orderBy: { id: "desc" } });
    return rows.map((r) => ({
      id: r.id,
      judul: r.judul,
      gambar: r.gambar,
      createdAt: r.createdAt,
    }));
  } catch {
    return [];
  }
}

export interface DokumenItem {
  id: number;
  judul: string;
  kategori: string;
  deskripsi: string | null;
  filename: string | null;
  file: string;
  createdAt: Date;
}

export async function getDokumenList(): Promise<DokumenItem[]> {
  try {
    const rows = await prisma.dokumen.findMany({ orderBy: { id: "desc" } });
    return rows.map((r) => ({
      id: r.id,
      judul: r.judul,
      kategori: r.kategori,
      deskripsi: r.deskripsi,
      filename: r.filename,
      file: r.file,
      createdAt: r.createdAt,
    }));
  } catch {
    return [];
  }
}
