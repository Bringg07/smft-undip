import { describe, expect, it } from "vitest";
import { dataUrlByteSize } from "./utils";

describe("dataUrlByteSize", () => {
  it("mengembalikan 0 untuk string kosong", () => {
    expect(dataUrlByteSize("")).toBe(0);
  });

  it("menghitung ukuran data URL gambar base64", () => {
    // "aGVsbG8=" = "hello" (5 byte)
    const dataUrl = "data:image/png;base64,aGVsbG8=";
    expect(dataUrlByteSize(dataUrl)).toBe(5);
  });

  it("menghitung tanpa padding", () => {
    // "aGk=" = "hi" (2 byte)
    const dataUrl = "data:text/plain;base64,aGk=";
    expect(dataUrlByteSize(dataUrl)).toBe(2);
  });

  it("menghitung string tanpa prefiks data:", () => {
    expect(dataUrlByteSize("YWJj")).toBe(3); // "abc"
  });
});
