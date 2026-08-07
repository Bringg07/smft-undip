import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

// DELETE /api/galeri/:id — admin, hapus foto galeri
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
    await prisma.galeri.delete({ where: { id: Number(id) } });
    revalidatePath("/galeri", "layout");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus galeri" }, { status: 500 });
  }
}
