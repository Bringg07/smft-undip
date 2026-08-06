import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getProgramKerjaList } from "@/lib/data";

// GET /api/program-kerja — publik
export async function GET() {
  const list = await getProgramKerjaList();
  return NextResponse.json(list);
}

// POST /api/program-kerja — admin
export async function POST(request: Request) {
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

  try {
    const body = await request.json();
    const { title, category, status, desc, periode } = body;

    if (!title || !category || !desc) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const program = await prisma.programKerja.create({
      data: {
        title,
        category,
        status: status || "Berjalan",
        desc,
        periode: periode || null,
      },
    });

    revalidatePath("/program-kerja", "layout");
    return NextResponse.json(program, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan program kerja" }, { status: 500 });
  }
}
