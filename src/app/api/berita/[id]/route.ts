import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getBeritaById } from "@/lib/data";
import { dataUrlByteSize } from "@/lib/utils";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

type Context = { params: Promise<{ id: string }> };

// GET /api/berita/:id — publik
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const berita = await getBeritaById(Number(id));
  if (!berita) {
    return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(berita);
}

// PUT /api/berita/:id — admin, perbarui berita
export async function PUT(request: Request, { params }: Context) {
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

  const { id } = await params;

  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, date, image } = body;

    if (!title || !excerpt || !Array.isArray(content) || content.length === 0) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    if (image && dataUrlByteSize(image) > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Foto terlalu besar (maks 5 MB)" }, { status: 400 });
    }

    const berita = await prisma.berita.update({
      where: { id: Number(id) },
      data: {
        title,
        excerpt,
        content,
        image: image || null,
        category,
        author,
        date,
      },
    });

    revalidatePath("/berita", "layout");
    return NextResponse.json(berita);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui berita" }, { status: 500 });
  }
}

// DELETE /api/berita/:id — admin, hapus berita
export async function DELETE(_request: Request, { params }: Context) {
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

  const { id } = await params;

  try {
    await prisma.berita.delete({ where: { id: Number(id) } });
    revalidatePath("/berita", "layout");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus berita" }, { status: 500 });
  }
}
