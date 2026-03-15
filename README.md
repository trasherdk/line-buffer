# @trasherdk/line-buffer

> For reading stream's data as lines.

This is a maintained fork of [line-buffer](https://github.com/xpepermint/line-buffer) by Kristijan Sedlak, which is no longer actively maintained. This fork has been modernized with TypeScript strict mode, ESM-only output, and current tooling.

## Changes from the original

- Rewritten as strict TypeScript
- ESM-only (no CommonJS)
- Vitest instead of AVA
- Node.js >= 18

## Install

```
pnpm add @trasherdk/line-buffer
```

## Example

```ts
import { LineBuffer } from '@trasherdk/line-buffer';

const buffer = new LineBuffer();
buffer.feed('abc\ndef\r\nghi'); // -> ['abc', 'def', 'ghi']
buffer.feed('123\r');           // -> []
buffer.feed('\n456');            // -> ['123']
buffer.feed('\n');               // -> ['456']
```

## API

**LineBuffer()**

> A core buffer class.

**linebuffer.feed(data): string[]**

> Feeds the buffer with data and returns any complete lines extracted.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| data | `string \| Buffer \| Uint8Array` | No | - | A chunk of data to fill the buffer.

**linebuffer.drain(): void**

> Clears the buffer.

**Event: linebuffer.on('line', (line) => {})**

> Emitted when a new line of data is available.

| Argument | Type | Description
|----------|------|------------
| line | `string` | A line of data.

**Event: linebuffer.on('drain', () => {})**

> Emitted when the buffer is cleared.

See [PUBLISH.md](PUBLISH.md) for release and publish instructions.

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
