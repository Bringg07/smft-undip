import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

// PUT /api/pengurus/:id — admin, perbarui pengurus
export async function PUT(request: Request, { params }: Context) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const { nama, jabatan, kategori, urutan, foto } = body;

    if (!nama || !jabatan || !kategori) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const pengurus = await prisma.pengurus.update({
      where: { id: Number(id) },
      data: {
        nama,
        jabatan,
        kategori,
        urutan: typeof urutan === "number" ? urutan : 0,
        foto: foto || null,
      },
    });

    revalidatePath("/");
    return NextResponse.json(pengurus);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui pengurus" }, { status: 500 });
  }
}

// DELETE /api/pengurus/:id — admin, hapus pengurus
export async function DELETE(_request: Request, { params }: Context) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 });
  }

  const { id } = await params;
  try {
    await prisma.pengurus.delete({ where: { id: Number(id) } });
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus pengurus" }, { status: 500 });
  }
}
