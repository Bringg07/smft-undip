-- CreateTable
CREATE TABLE "AnggotaStruktur" (
    "id" SERIAL NOT NULL,
    "unit" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "peran" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AnggotaStruktur_pkey" PRIMARY KEY ("id")
);
