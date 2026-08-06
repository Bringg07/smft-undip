import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { articles } from "../src/lib/berita";
import { programs } from "../src/lib/program-kerja";

const prisma = new PrismaClient();

async function main() {
  // 1. Akun admin
  const email = process.env.ADMIN_EMAIL || "admin@smftundip.com";
  const password = process.env.ADMIN_PASSWORD || "ganti-password-admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    // Password hanya di-set saat akun pertama kali dibuat,
    // tidak di-reset ulang setiap kali seed dijalankan.
    update: {},
    create: {
      email,
      name: "Admin SMFT",
      passwordHash,
      role: "admin",
    },
  });
  console.log(`✓ Akun admin: ${email} (password: ${password})`);

  // 2. Data awal berita (hanya bila tabel kosong)
  if ((await prisma.berita.count()) === 0) {
    await prisma.berita.createMany({
      data: articles.map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category,
        author: a.author,
        date: a.date,
      })),
    });
    console.log(`✓ ${articles.length} berita awal di-seed`);
  }

  // 3. Data awal program kerja (hanya bila tabel kosong)
  if ((await prisma.programKerja.count()) === 0) {
    await prisma.programKerja.createMany({
      data: programs.map((p) => ({
        title: p.title,
        category: p.category,
        status: p.status,
        desc: p.desc,
        periode: p.periode ?? null,
      })),
    });
    console.log(`✓ ${programs.length} program kerja awal di-seed`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
