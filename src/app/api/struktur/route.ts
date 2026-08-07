import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getStrukturList } from "@/lib/data";

// GET /api/struktur — publik, daftar anggota struktur organisasi
export async function GET() {
  const list = await getStrukturList();
  return NextResponse.json(list);
}

// POST /api/struktur — admin, tambah anggota
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
    const { unit, nama, peran, urutan } = body;

    if (!unit || !nama || !peran) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const anggota = await prisma.anggotaStruktur.create({
      data: {
        unit,
        nama,
        peran,
        urutan: typeof urutan === "number" ? urutan : 0,
      },
    });

    revalidatePath("/struktur-organisasi");
    return NextResponse.json(anggota, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan anggota" }, { status: 500 });
  }
}
