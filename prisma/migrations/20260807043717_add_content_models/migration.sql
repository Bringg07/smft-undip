-- CreateEnum
CREATE TYPE "AspirasiStatus" AS ENUM ('Baru', 'Ditindaklanjuti');

-- AlterTable
ALTER TABLE "Berita" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "Aspirasi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "status" "AspirasiStatus" NOT NULL DEFAULT 'Baru',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aspirasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengurus" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "foto" TEXT,

    CONSTRAINT "Pengurus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galeri" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dokumen" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "deskripsi" TEXT,
    "filename" TEXT,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dokumen_pkey" PRIMARY KEY ("id")
);
