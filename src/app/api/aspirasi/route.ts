import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getAspirasiList } from "@/lib/data";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// GET /api/aspirasi — admin, daftar aspirasi
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = await getAspirasiList();
  return NextResponse.json(list);
}

// POST /api/aspirasi — publik, kirim aspirasi baru (rate-limited anti-spam)
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`aspirasi:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Terlalu banyak pengiriman. Coba lagi dalam ${limited.retryAfterSec} detik.` },
      { status: 429 }
    );
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Fitur aspirasi belum tersedia. Silakan hubungi kami melalui media sosial." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { nama, nim, tujuan, pesan } = body;

    if (!nama || !nim || !tujuan || !pesan) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    if (nama.length > 100 || nim.length > 30 || pesan.length > 2000) {
      return NextResponse.json({ error: "Data melebihi batas panjang" }, { status: 400 });
    }

    const aspirasi = await prisma.aspirasi.create({
      data: { nama, nim, tujuan, pesan },
    });

    return NextResponse.json(aspirasi, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan aspirasi" }, { status: 500 });
  }
}
