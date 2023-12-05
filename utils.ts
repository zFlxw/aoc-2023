export function readFileLines(path: string): string[] {
  return Deno.readTextFileSync(`${Deno.cwd()}/${path}`).split('\n');
}

/**
 * Chunks a string into fixed-length parts.
 * 
 * @param str The string to chunk.
 * @param size The size of the parts.
 * @returns An array of the chunked string.
 */
export function chunkString(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}
