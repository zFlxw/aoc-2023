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

export function day04_02() {
  let totalCards = lines.length;
  let wins: Record<string, number> = {};
  let cards: Record<string, number> = {};

  lines.forEach((line) => {
    const gameId = +line.split(': ')[0].split(' ')[1];
    if (!cards[gameId]) {
      cards[gameId] = 1;
    }
  });

  lines.forEach((line) => {
    const [game, numbers] = line.split(': ');
    const [winning, own] = numbers.split(' | ');
    const winningNumbers: number[] = [];
    const gameId = +game.split(' ')[1];

    let matches = 0;

    chunkSubstr(winning, 3).forEach((value) => {
      winningNumbers.push(+value.trim());
    });

    chunkSubstr(own, 3).forEach((value) => {
      if (winningNumbers.includes(+value.trim())) {
        matches++;
      }
    });

    for (let i = 1; i <= matches; i++) {
      if (cards[(gameId + i).toString()]) {
        cards[(+gameId + i).toString()] += 1 * cards[gameId];
      }
    }

    totalCards += matches;
  });

  let sum = 0;
  for (const value of Object.values(cards)) {
    sum += value;
  }

  console.log('Total Cards: ', sum);
}

function chunkSubstr(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}
