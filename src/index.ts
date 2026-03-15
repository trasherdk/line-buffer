import { EventEmitter } from "node:events";

interface LineBufferEvents {
  line: [line: string];
  drain: [];
}

/**
 * Core class for reading stream data as lines.
 */
export class LineBuffer extends EventEmitter<LineBufferEvents> {
  #buffer = "";

  /**
   * Feed chunks of data; returns any complete lines extracted.
   */
  feed(chunk: string | Buffer | Uint8Array): string[] {
    this.#buffer += (chunk ?? "").toString("binary");

    let lines = this.#buffer.split(/\r?\n/);
    if (lines.length > 1) {
      this.#buffer = lines.pop() ?? "";
      lines = lines.filter((v) => !!v);
      for (const line of lines) {
        this.emit("line", line);
      }
      return lines;
    }
    return [];
  }

  /**
   * Clears the buffer.
   */
  drain(): void {
    this.#buffer = "";
    this.emit("drain");
  }
}
