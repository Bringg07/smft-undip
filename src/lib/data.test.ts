import { describe, expect, it } from "vitest";
import { articles } from "./berita";
import { programs } from "./program-kerja";
import { pengurusList } from "./pengurus";
import { anggotaStrukturList, strukturUnits } from "./struktur";

describe("data statis fallback", () => {
  it("berita: semua punya judul dan konten", () => {
    expect(articles.length).toBeGreaterThan(0);
    for (const a of articles) {
      expect(a.title).toBeTruthy();
      expect(a.content.length).toBeGreaterThan(0);
      expect(a.excerpt).toBeTruthy();
    }
  });

  it("berita: id unik", () => {
    const ids = articles.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("program kerja: status valid", () => {
    for (const p of programs) {
      expect(["Selesai", "Berjalan", "Segera"]).toContain(p.status);
      expect(p.title).toBeTruthy();
    }
  });

  it("pengurus: kategori valid", () => {
    for (const p of pengurusList) {
      expect(["Pimpinan", "Sekretariat", "Bendahara", "Badan", "Komisi"]).toContain(p.kategori);
    }
  });

  it("struktur: semua anggota memakai unit yang terdaftar", () => {
    expect(anggotaStrukturList.length).toBeGreaterThan(0);
    for (const a of anggotaStrukturList) {
      expect(strukturUnits).toContain(a.unit);
      expect(["Senator", "Staff Ahli"]).toContain(a.peran);
      expect(a.nama).toBeTruthy();
    }
  });

  it("struktur: id unik dan urutan positif per unit", () => {
    const ids = anggotaStrukturList.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of anggotaStrukturList) {
      expect(a.urutan).toBeGreaterThan(0);
    }
  });
});
