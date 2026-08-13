
const http = require('http');

const PORT = process.env.PORT || 3000;

// iPhone 12 Pro @ 3x
const WIDTH = 1170;
const HEIGHT = 2532;

const TARGET_DATE = new Date('2026-08-25T00:00:00');

const COLORS = {
  background: [0, 0, 0],
  green: [0, 166, 81],
  white: [255, 255, 255],
  gray: [142, 142, 147],
  darkGray: [92, 92, 94],
};

/*
 * ---------------------------------------------------------
 *  DAYS LEFT
 * ---------------------------------------------------------
 */

function getDaysLeft() {
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const diff = TARGET_DATE - today;

  return Math.ceil(diff / 86400000);
}

/*
 * ---------------------------------------------------------
 *  SIMPLE BITMAP FONT
 *
 *  Each character is a 5x7 bitmap.
 * ---------------------------------------------------------
 */

const FONT = {
  '0': [
    '11111',
    '10001',
    '10011',
    '10101',
    '11001',
    '10001',
    '11111',
  ],

  '1': [
    '00100',
    '01100',
    '00100',
    '00100',
    '00100',
    '00100',
    '01110',
  ],

  '2': [
    '11111',
    '00001',
    '00001',
    '11111',
    '10000',
    '10000',
    '11111',
  ],

  '3': [
    '11111',
    '00001',
    '00001',
    '11111',
    '00001',
    '00001',
    '11111',
  ],

  '4': [
    '10001',
    '10001',
    '10001',
    '11111',
    '00001',
    '00001',
    '00001',
  ],

  '5': [
    '11111',
    '10000',
    '10000',
    '11111',
    '00001',
    '00001',
    '11111',
  ],

  '6': [
    '11111',
    '10000',
    '10000',
    '11111',
    '10001',
    '10001',
    '11111',
  ],

  '7': [
    '11111',
    '00001',
    '00010',
    '00100',
    '01000',
    '01000',
    '01000',
  ],

  '8': [
    '11111',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '11111',
  ],

  '9': [
    '11111',
    '10001',
    '10001',
    '11111',
    '00001',
    '00001',
    '11111',
  ],

  'A': [
    '01110',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001',
  ],

  'B': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10001',
    '10001',
    '11110',
  ],

  'C': [
    '01111',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '01111',
  ],

  'D': [
    '11110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '11110',
  ],

  'E': [
    '11111',
    '10000',
    '10000',
    '11110',
    '10000',
    '10000',
    '11111',
  ],

  'F': [
    '11111',
    '10000',
    '10000',
    '11110',
    '10000',
    '10000',
    '10000',
  ],

  'G': [
    '01111',
    '10000',
    '10000',
    '10111',
    '10001',
    '10001',
    '01111',
  ],

  'H': [
    '10001',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001',
  ],

  'I': [
    '11111',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '11111',
  ],

  'J': [
    '00111',
    '00010',
    '00010',
    '00010',
    '10010',
    '10010',
    '01100',
  ],

  'K': [
    '10001',
    '10010',
    '10100',
    '11000',
    '10100',
    '10010',
    '10001',
  ],

  'L': [
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '11111',
  ],

  'M': [
    '10001',
    '11011',
    '10101',
    '10101',
    '10001',
    '10001',
    '10001',
  ],

  'N': [
    '10001',
    '11001',
    '11001',
    '10101',
    '10011',
    '10011',
    '10001',
  ],

  'O': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110',
  ],

  'P': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10000',
    '10000',
    '10000',
  ],

  'Q': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10101',
    '10010',
    '01101',
  ],

  'R': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10100',
    '10010',
    '10001',
  ],

  'S': [
    '01111',
    '10000',
    '10000',
    '01110',
    '00001',
    '00001',
    '11110',
  ],

  'T': [
    '11111',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
  ],

  'U': [
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110',
  ],

  'V': [
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01010',
    '00100',
  ],

  'W': [
    '10001',
    '10001',
    '10001',
    '10101',
    '10101',
    '11011',
    '10001',
  ],

  'X': [
    '10001',
    '10001',
    '01010',
    '00100',
    '01010',
    '10001',
    '10001',
  ],

  'Y': [
    '10001',
    '10001',
    '01010',
    '00100',
    '00100',
    '00100',
    '00100',
  ],

  'Z': [
    '11111',
    '00001',
    '00010',
    '00100',
    '01000',
    '10000',
    '11111',
  ],

  ' ': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
  ],

  '.': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00110',
    '00110',
  ],

  '-': [
    '00000',
    '00000',
    '00000',
    '11111',
    '00000',
    '00000',
    '00000',
  ],

  '·': [
    '00000',
    '00000',
    '00100',
    '00000',
    '00000',
    '00000',
    '00000',
  ],
};

/*
 * ---------------------------------------------------------
 *  IMAGE BUFFER
 * ---------------------------------------------------------
 *
 * RGB image.
 */

function createImage() {
  const pixels = new Uint8Array(WIDTH * HEIGHT * 3);

  // Fill black
  pixels.fill(0);

  return pixels;
}

function setPixel(pixels, x, y, color) {
  if (
    x < 0 ||
    x >= WIDTH ||
    y < 0 ||
    y >= HEIGHT
  ) {
    return;
  }

  const index = (y * WIDTH + x) * 3;

  pixels[index] = color[0];
  pixels[index + 1] = color[1];
  pixels[index + 2] = color[2];
}

/*
 * ---------------------------------------------------------
 *  RECTANGLE
 * ---------------------------------------------------------
 */

function fillRect(pixels, x, y, width, height, color) {
  const x1 = Math.max(0, Math.floor(x));
  const y1 = Math.max(0, Math.floor(y));
  const x2 = Math.min(WIDTH, Math.floor(x + width));
  const y2 = Math.min(HEIGHT, Math.floor(y + height));

  for (let py = y1; py < y2; py++) {
    for (let px = x1; px < x2; px++) {
      setPixel(pixels, px, py, color);
    }
  }
}

/*
 * ---------------------------------------------------------
 *  BITMAP TEXT
 * ---------------------------------------------------------
 */

function textWidth(text, scale, spacing = 1) {
  return (
    text.length * (5 * scale) +
    (text.length - 1) * spacing * scale
  );
}

function drawText(
  pixels,
  text,
  centerX,
  topY,
  scale,
  color,
  spacing = 1
) {
  const width = textWidth(text, scale, spacing);

  let x = Math.floor(centerX - width / 2);

  for (const character of text) {
    const glyph = FONT[character] || FONT[' '];

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col] === '1') {
          fillRect(
            pixels,
            x + col * scale,
            topY + row * scale,
            scale,
            scale,
            color
          );
        }
      }
    }

    x += (5 + spacing) * scale;
  }
}

/*
 * ---------------------------------------------------------
 *  CRC32
 * ---------------------------------------------------------
 */

function crc32(buffer) {
  let crc = 0xffffffff;

  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];

    for (let j = 0; j < 8; j++) {
      crc =
        (crc >>> 1) ^
        (crc & 1
          ? 0xedb88320
          : 0);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

/*
 * ---------------------------------------------------------
 *  ADLER32
 * ---------------------------------------------------------
 */

function adler32(buffer) {
  let a = 1;
  let b = 0;

  for (let i = 0; i < buffer.length; i++) {
    a = (a + buffer[i]) % 65521;
    b = (b + a) % 65521;
  }

  return ((b << 16) | a) >>> 0;
}

/*
 * ---------------------------------------------------------
 *  PNG CHUNK
 * ---------------------------------------------------------
 */

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);

  const chunk = Buffer.alloc(
    12 + data.length
  );

  chunk.writeUInt32BE(data.length, 0);

  typeBuffer.copy(chunk, 4);

  data.copy(chunk, 8);

  const checksum = crc32(
    Buffer.concat([
      typeBuffer,
      data,
    ])
  );

  chunk.writeUInt32BE(
    checksum,
    8 + data.length
  );

  return chunk;
}

/*
 * ---------------------------------------------------------
 *  RAW PNG DATA
 *
 * Uses PNG filter type 0.
 * ---------------------------------------------------------
 */

function createRawPNGData(pixels) {
  const rowSize = WIDTH * 3 + 1;

  const raw = Buffer.alloc(
    rowSize * HEIGHT
  );

  let offset = 0;

  for (let y = 0; y < HEIGHT; y++) {
    // No filtering
    raw[offset++] = 0;

    const start = y * WIDTH * 3;

    for (
      let x = 0;
      x < WIDTH * 3;
      x++
    ) {
      raw[offset++] =
        pixels[start + x];
    }
  }

  return raw;
}

/*
 * ---------------------------------------------------------
 *  DEFLATE WITHOUT ZLIB
 *
 * We use stored DEFLATE blocks.
 * No compression library required.
 * ---------------------------------------------------------
 */

function createDeflate(data) {
  const chunks = [];

  let offset = 0;

  const MAX_BLOCK = 65535;

  while (offset < data.length) {
    const remaining =
      data.length - offset;

    const size = Math.min(
      remaining,
      MAX_BLOCK
    );

    const final =
      offset + size >= data.length;

    const block = Buffer.alloc(
      5 + size
    );

    // BFINAL + BTYPE=00
    block[0] = final ? 1 : 0;

    block.writeUInt16LE(
      size,
      1
    );

    block.writeUInt16LE(
      (~size) & 0xffff,
      3
    );

    data.copy(
      block,
      5,
      offset,
      offset + size
    );

    chunks.push(block);

    offset += size;
  }

  // Empty stream
  if (data.length === 0) {
    chunks.push(
      Buffer.from([
        1,
        0,
        0,
        255,
        255,
      ])
    );
  }

  return Buffer.concat(chunks);
}

/*
 * ---------------------------------------------------------
 *  PNG ENCODER
 * ---------------------------------------------------------
 */

function encodePNG(pixels) {
  const signature = Buffer.from([
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10,
  ]);

  // IHDR
  const ihdr = Buffer.alloc(13);

  ihdr.writeUInt32BE(
    WIDTH,
    0
  );

  ihdr.writeUInt32BE(
    HEIGHT,
    4
  );

  // Bit depth
  ihdr[8] = 8;

  // Color type: RGB
  ihdr[9] = 2;

  // Compression
  ihdr[10] = 0;

  // Filter
  ihdr[11] = 0;

  // Interlace
  ihdr[12] = 0;

  const raw = createRawPNGData(
    pixels
  );

  const compressed = createDeflate(
    raw
  );

  // zlib wrapper
  const zlibHeader = Buffer.from([
    0x78,
    0x01,
  ]);

  const checksum = Buffer.alloc(4);

  checksum.writeUInt32BE(
    adler32(raw),
    0
  );

  const idat = Buffer.concat([
    zlibHeader,
    compressed,
    checksum,
  ]);

  const png = Buffer.concat([
    signature,

    pngChunk(
      'IHDR',
      ihdr
    ),

    pngChunk(
      'IDAT',
      idat
    ),

    pngChunk(
      'IEND',
      Buffer.alloc(0)
    ),
  ]);

  return png;
}

/*
 * ---------------------------------------------------------
 *  GENERATE COUNTDOWN IMAGE
 * ---------------------------------------------------------
 */

function generateImage() {
  const pixels = createImage();

  const days = getDaysLeft();

  const passedOut = days <= 0;

  /*
   * Top label
   */

  const topLabelScale = 6;
  const labelScale = 5;

  const numberScale = 70;
  const numberHeight = 7 * numberScale;
  const numberY = Math.floor(
    HEIGHT / 2 - numberHeight / 2 + 20
  );

  drawText(
    pixels,
    'NYSC BATCH B2 · 2026',
    WIDTH / 2,
    numberY - 150,
    topLabelScale,
    COLORS.gray,
    1
  );

  /*
   * Big number
   *
   * The bitmap font is 5x7, so we
   * scale it aggressively.
   */

  const number = passedOut
    ? '0'
    : String(days);

  drawText(
    pixels,
    number,
    WIDTH / 2,
    numberY,
    numberScale,
    COLORS.green,
    1
  );

  /*
   * Label
   */

  const label = passedOut
    ? 'YOU HAVE PASSED OUT'
    : days === 1
      ? 'DAY LEFT'
      : 'DAYS LEFT';

  drawText(
    pixels,
    label,
    WIDTH / 2,
    numberY +
      numberHeight +
      70,
    labelScale,
    COLORS.white,
    1
  );

  /*
   * Bottom text
   */

  drawText(
    pixels,
    'PASSING-OUT DATE · AUGUST 25, 2026',
    WIDTH / 2,
    HEIGHT - 210,
    5,
    COLORS.darkGray,
    1
  );

  return encodePNG(pixels);
}

/*
 * ---------------------------------------------------------
 *  HTTP SERVER
 * ---------------------------------------------------------
 */

const server = http.createServer(
  (req, res) => {

    if (
      req.method === 'GET' &&
      req.url === '/'
    ) {
      const response = JSON.stringify({
        message:
          'NYSC Batch B2 2026 countdown API',
        endpoint: '/days-left',
        format: 'image/png',
      });

      res.writeHead(200, {
        'Content-Type':
          'application/json',
        'Content-Length':
          Buffer.byteLength(response),
      });

      res.end(response);

      return;
    }

    if (
      req.method === 'GET' &&
      req.url === '/days-left'
    ) {
      try {
        const image =
          generateImage();

        res.writeHead(200, {
          'Content-Type':
            'image/png',

          'Content-Length':
            image.length,

          'Cache-Control':
            'no-store',
        });

        res.end(image);

      } catch (error) {
        console.error(error);

        res.writeHead(500, {
          'Content-Type':
            'application/json',
        });

        res.end(
          JSON.stringify({
            error:
              'Failed to generate image',
          })
        );
      }

      return;
    }

    res.writeHead(404, {
      'Content-Type':
        'application/json',
    });

    res.end(
      JSON.stringify({
        error: 'Not found',
      })
    );
  }
);

server.listen(
  PORT,
  () => {
    console.log(
      `NYSC countdown API running on http://localhost:${PORT}`
    );

    console.log(
      `Hit GET /days-left for the PNG image`
    );
  }
);
