import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getGaleriList } from "@/lib/data";
import { dataUrlByteSize } from "@/lib/utils";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

// GET /api/galeri — publik, daftar galeri
export async function GET() {
  const list = await getGaleriList();
  return NextResponse.json(list);
}

// POST /api/galeri — admin, tambah foto galeri
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
    const { judul, gambar } = body;

    if (!judul || !gambar || !gambar.startsWith("data:")) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    if (dataUrlByteSize(gambar) > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Foto terlalu besar (maks 5 MB)" }, { status: 400 });
    }

    const galeri = await prisma.galeri.create({ data: { judul, gambar } });

    revalidatePath("/galeri", "layout");
    return NextResponse.json(galeri, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan galeri" }, { status: 500 });
  }
}
