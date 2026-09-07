/* Reading uploaded study files.

   Plain text, Markdown, CSV, TSV and JSON are read directly.

   DOCX is unzipped and parsed here rather than through a library: a .docx is
   a ZIP whose word/document.xml holds the text, and DecompressionStream can
   inflate it, so importing a Word document works with no network access.

   PDF genuinely needs a parser, so pdf.js is loaded from a CDN on demand and
   the failure is reported plainly if there is no connection. */

const PDFJS_VERSION = '4.4.168';
const PDFJS_BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

export const ACCEPTED_EXTENSIONS = ['.txt', '.md', '.csv', '.tsv', '.json', '.docx', '.pdf'];

export function extensionOf(name) {
  const match = String(name).toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? match[0] : '';
}

/* ---------------------------------------------------------------
   DOCX — ZIP reader + document.xml text extraction
   --------------------------------------------------------------- */

function findEndOfCentralDirectory(view) {
  // The EOCD is at most 22 + 65535 bytes from the end.
  const limit = Math.min(view.byteLength, 22 + 65535);
  for (let i = 22; i <= limit; i++) {
    const offset = view.byteLength - i;
    if (view.getUint32(offset, true) === 0x06054b50) return offset;
  }
  return -1;
}

async function inflateRaw(bytes) {
  if (typeof DecompressionStream !== 'function') {
    throw new Error('This browser cannot decompress .docx files. Save the document as .txt and import that instead.');
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Pull one named file out of a ZIP archive. */
async function readZipEntry(buffer, wantedName) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const eocd = findEndOfCentralDirectory(view);
  if (eocd < 0) throw new Error('That file is not a valid .docx archive.');

  const entryCount = view.getUint16(eocd + 10, true);
  let pointer = view.getUint32(eocd + 16, true);
  const decoder = new TextDecoder();

  for (let i = 0; i < entryCount; i++) {
    if (view.getUint32(pointer, true) !== 0x02014b50) break;
    const method = view.getUint16(pointer + 10, true);
    const compressedSize = view.getUint32(pointer + 20, true);
    const nameLength = view.getUint16(pointer + 28, true);
    const extraLength = view.getUint16(pointer + 30, true);
    const commentLength = view.getUint16(pointer + 32, true);
    const localOffset = view.getUint32(pointer + 42, true);
    const name = decoder.decode(bytes.subarray(pointer + 46, pointer + 46 + nameLength));

    if (name === wantedName) {
      if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error('Corrupt .docx archive.');
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const data = bytes.subarray(dataStart, dataStart + compressedSize);
      if (method === 0) return decoder.decode(data);
      if (method === 8) return decoder.decode(await inflateRaw(data));
      throw new Error(`Unsupported compression in .docx (method ${method}).`);
    }
    pointer += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error('No document text was found inside that .docx file.');
}

function decodeEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&');
}

export function docxXmlToText(xml) {
  return decodeEntities(
    xml
      .replace(/<w:tab\b[^>]*\/>/g, '\t')
      .replace(/<w:br\b[^>]*\/>/g, '\n')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3}/g, '\n\n')
    .trim();
}

export async function readDocx(file) {
  const buffer = await file.arrayBuffer();
  const xml = await readZipEntry(buffer, 'word/document.xml');
  return docxXmlToText(xml);
}

/* ---------------------------------------------------------------
   PDF — pdf.js, loaded on demand
   --------------------------------------------------------------- */

let pdfjsPromise = null;

async function loadPdfjs() {
  if (pdfjsPromise) return pdfjsPromise;
  pdfjsPromise = (async () => {
    let module;
    try {
      module = await import(/* @vite-ignore */ `${PDFJS_BASE}/pdf.min.mjs`);
    } catch (err) {
      pdfjsPromise = null;
      throw new Error('Could not load the PDF reader (no internet connection?). Copy the text into a .txt file and import that instead.');
    }
    const pdfjs = module.default || module;
    if (pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/pdf.worker.min.mjs`;
    }
    return pdfjs;
  })();
  return pdfjsPromise;
}

export async function readPdf(file, onProgress) {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    onProgress?.(i, doc.numPages);
    const page = await doc.getPage(i);
    const content = await page.getTextContent();

    /* pdf.js returns positioned fragments, not lines. Group by vertical
       position so the line structure the parsers rely on survives. */
    const lines = new Map();
    for (const item of content.items) {
      if (!item.str) continue;
      const y = Math.round(item.transform[5]);
      const line = lines.get(y) || [];
      line.push(item);
      lines.set(y, line);
    }
    const ordered = [...lines.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, items]) => items
        .sort((a, b) => a.transform[4] - b.transform[4])
        .map(item => item.str)
        .join('')
        .replace(/\s+/g, ' ')
        .trim())
      .filter(Boolean);
    pages.push(ordered.join('\n'));
  }
  return pages.join('\n\n');
}

/* ---------------------------------------------------------------
   Entry point
   --------------------------------------------------------------- */

export async function readStudyFile(file, onProgress) {
  const extension = extensionOf(file.name);
  if (!ACCEPTED_EXTENSIONS.includes(extension)) {
    throw new Error(`Unsupported file type "${extension || file.name}". Accepted: ${ACCEPTED_EXTENSIONS.join(', ')}`);
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error('That file is larger than 12 MB. Split it into smaller files.');
  }

  if (extension === '.docx') return readDocx(file);
  if (extension === '.pdf') return readPdf(file, onProgress);
  return file.text();
}
