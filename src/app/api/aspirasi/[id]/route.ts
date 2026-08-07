import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

// PATCH /api/aspirasi/:id — admin, ubah status (Baru / Ditindaklanjuti)
export async function PATCH(request: Request, { params }: Context) {
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
    const { status } = body;
    if (status !== "Baru" && status !== "Ditindaklanjuti") {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }
    const updated = await prisma.aspirasi.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui aspirasi" }, { status: 500 });
  }
}

// DELETE /api/aspirasi/:id — admin, hapus aspirasi
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
    await prisma.aspirasi.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus aspirasi" }, { status: 500 });
  }
}
