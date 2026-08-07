import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getBeritaList } from "@/lib/data";
import { dataUrlByteSize } from "@/lib/utils";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

// GET /api/berita — publik, daftar berita
export async function GET() {
  const list = await getBeritaList();
  return NextResponse.json(list);
}

// POST /api/berita — admin, tambah berita baru
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database belum dikonfigurasi. Isi DATABASE_URL di file .env lalu jalankan npm run db:migrate." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, date, image } = body;

    if (!title || !excerpt || !Array.isArray(content) || content.length === 0) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    if (image && dataUrlByteSize(image) > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Foto terlalu besar (maks 5 MB)" }, { status: 400 });
    }

    const berita = await prisma.berita.create({
      data: {
        title,
        excerpt,
        content,
        image: image || null,
        category: category || "Berita Umum",
        author: author || "Divisi Humas SMFT",
        date: date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      },
    });

    revalidatePath("/berita", "layout");
    return NextResponse.json(berita, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan berita" }, { status: 500 });
  }
}
