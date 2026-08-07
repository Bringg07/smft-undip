import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

// PUT /api/struktur/:id — admin, perbarui anggota
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
    const { unit, nama, peran, urutan } = body;

    if (!unit || !nama || !peran) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const anggota = await prisma.anggotaStruktur.update({
      where: { id: Number(id) },
      data: {
        unit,
        nama,
        peran,
        urutan: typeof urutan === "number" ? urutan : 0,
      },
    });

    revalidatePath("/struktur-organisasi");
    return NextResponse.json(anggota);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui anggota" }, { status: 500 });
  }
}

// DELETE /api/struktur/:id — admin, hapus anggota
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
    await prisma.anggotaStruktur.delete({ where: { id: Number(id) } });
    revalidatePath("/struktur-organisasi");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus anggota" }, { status: 500 });
  }
}
