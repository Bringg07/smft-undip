import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

// GET /api/program-kerja/:id — publik
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  try {
    const program = await prisma.programKerja.findUnique({ where: { id: Number(id) } });
    if (!program) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(program);
  } catch {
    return NextResponse.json({ error: "Gagal memuat program" }, { status: 500 });
  }
}

// PUT /api/program-kerja/:id — admin
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
    const { title, category, status, desc, periode } = body;

    if (!title || !category || !desc) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const program = await prisma.programKerja.update({
      where: { id: Number(id) },
      data: {
        title,
        category,
        status,
        desc,
        periode: periode || null,
      },
    });

    revalidatePath("/program-kerja", "layout");
    return NextResponse.json(program);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui program" }, { status: 500 });
  }
}

// DELETE /api/program-kerja/:id — admin
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
    await prisma.programKerja.delete({ where: { id: Number(id) } });
    revalidatePath("/program-kerja", "layout");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus program" }, { status: 500 });
  }
}
