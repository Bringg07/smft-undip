import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getPengurusList } from "@/lib/data";

// GET /api/pengurus — publik, daftar pengurus
export async function GET() {
  const list = await getPengurusList();
  return NextResponse.json(list);
}

// POST /api/pengurus — admin, tambah pengurus
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { nama, jabatan, kategori, urutan, foto } = body;

    if (!nama || !jabatan || !kategori) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const pengurus = await prisma.pengurus.create({
      data: {
        nama,
        jabatan,
        kategori,
        urutan: typeof urutan === "number" ? urutan : 0,
        foto: foto || null,
      },
    });

    revalidatePath("/");
    return NextResponse.json(pengurus, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan pengurus" }, { status: 500 });
  }
}
