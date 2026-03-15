/// <reference types="node" />
import { describe, it, expect, vi } from "vitest";
import { LineBuffer } from "../src/index.js";

describe("LineBuffer", () => {
  describe("feed", () => {
    it("handles string chunks", () => {
      const b = new LineBuffer();

      expect(b.feed("a\nb")).toEqual(["a"]);
      expect(b.feed("\r\nc\n")).toEqual(["b", "c"]);
      expect(b.feed("d\r")).toEqual([]);
      expect(b.feed("\n")).toEqual(["d"]);
    });

    it("handles Buffer chunks", () => {
      const b = new LineBuffer();

      expect(b.feed(Buffer.from("a\nb", "utf8"))).toEqual(["a"]);
      expect(b.feed(Buffer.from("\r\nc\n", "utf8"))).toEqual(["b", "c"]);
      expect(b.feed(Buffer.from("d\r", "utf8"))).toEqual([]);
      expect(b.feed(Buffer.from("\n", "utf8"))).toEqual(["d"]);
    });
  });

  describe("drain", () => {
    it("clears the buffer and emits drain", () => {
      const b = new LineBuffer();
      const drainHandler = vi.fn();

      b.on("drain", drainHandler);
      b.feed("a\nb");
      b.drain();

      expect(drainHandler).toHaveBeenCalled();
    });
  });
});
