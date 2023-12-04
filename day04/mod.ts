import { readFileLines } from '../utils.ts';

const lines = readFileLines('day04/input.txt');
export function day04_01() {
  let totalPoints = 0;

  lines.forEach((line) => {
    const [_, numbers] = line.split(': ');
    const [winning, own] = numbers.split(' | ');
    const winningNumbers: number[] = [];

    let matches = 0;

    chunkSubstr(winning, 3).forEach((value) => {
      winningNumbers.push(+value.trim());
    });

    chunkSubstr(own, 3).forEach((value) => {
      if (winningNumbers.includes(+value.trim())) {
        matches = matches > 0 ? matches * 2 : 1;
      }
    });

    totalPoints += matches;
  });

  console.log('Total Points: ' + totalPoints);
}

export function day04_02() {}

function chunkSubstr(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}
