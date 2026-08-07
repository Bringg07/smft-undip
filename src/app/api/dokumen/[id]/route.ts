import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { dataUrlByteSize } from "@/lib/utils";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

type Context = { params: Promise<{ id: string }> };

// PUT /api/dokumen/:id — admin, perbarui dokumen
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
    const { judul, kategori, deskripsi, filename, file } = body;

    if (!judul || !kategori || !file || !file.startsWith("data:")) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    if (dataUrlByteSize(file) > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File terlalu besar (maks 5 MB)" }, { status: 400 });
    }

    const dokumen = await prisma.dokumen.update({
      where: { id: Number(id) },
      data: {
        judul,
        kategori,
        deskripsi: deskripsi || null,
        filename: filename || null,
        file,
      },
    });

    revalidatePath("/dokumen", "layout");
    return NextResponse.json(dokumen);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui dokumen" }, { status: 500 });
  }
}

// DELETE /api/dokumen/:id — admin, hapus dokumen
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
    await prisma.dokumen.delete({ where: { id: Number(id) } });
    revalidatePath("/dokumen", "layout");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus dokumen" }, { status: 500 });
  }
}
