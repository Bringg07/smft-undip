import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getDokumenList } from "@/lib/data";
import { dataUrlByteSize } from "@/lib/utils";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

// GET /api/dokumen — publik, daftar dokumen
export async function GET() {
  const list = await getDokumenList();
  return NextResponse.json(list);
}

// POST /api/dokumen — admin, tambah dokumen
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
    const { judul, kategori, deskripsi, filename, file } = body;

    if (!judul || !kategori || !file || !file.startsWith("data:")) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    if (dataUrlByteSize(file) > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File terlalu besar (maks 5 MB)" }, { status: 400 });
    }

    const dokumen = await prisma.dokumen.create({
      data: {
        judul,
        kategori,
        deskripsi: deskripsi || null,
        filename: filename || null,
        file,
      },
    });

    revalidatePath("/dokumen", "layout");
    return NextResponse.json(dokumen, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan dokumen" }, { status: 500 });
  }
}
