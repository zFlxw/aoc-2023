import { readFileLines } from '../utils.ts';

const letterRanks = {
  A: 0,
  K: 1,
  Q: 2,
  J: 3,
  T: 4,
  '9': 5,
  '8': 6,
  '7': 7,
  '6': 8,
  '5': 9,
  '4': 10,
  '3': 11,
  '2': 12,
};

export function day07_01() {
  const bids: Record<string, number> = {};
  const ranks: string[][] = [];

  readFileLines('day07/input.txt').forEach((line) => {
    const [hand, bid] = line.split(' ');
    const chars: Record<string, number> = {};
    bids[hand] = +bid;

    for (const char of hand) {
      if (!chars[char]) {
        chars[char] = 1;
        continue;
      }

      chars[char]++;
    }

    let rating = 0;
    switch (Object.keys(chars).length) {
      case 5:
        // potential high card
        if (Object.keys(chars).some((char) => isNaN(+char) || +char > 6)) {
          rating = 1;
        }
        break;

      case 4:
        // one pair
        rating = 2;
        break;

      case 3:
        if (Object.values(chars).some((value) => value === 3)) {
          // Three of a kind
          rating = 4;
        } else {
          // Two pair
          rating = 3;
        }
        break;

      case 2:
        if (Object.values(chars).some((value) => value === 4)) {
          // Four of a kind
          rating = 6;
        } else {
          // Full House
          rating = 5;
        }
        break;

      case 1:
        // Five of a kind
        rating = 7;
    }

    if (ranks[rating]) {
      ranks[rating].push(hand);
    } else {
      ranks[rating] = [hand];
    }
  });

  for (let i = 0; i < ranks.length; i++) {
    if (!ranks[i]) {
      continue;
    }
    const rank = ranks[i];
    rank.sort((a, b) => {
      for (let j = 0; j < a.length; j++) {
        if (a[j] === b[j]) {
          continue;
        }

        return (
          letterRanks[b[j].toUpperCase() as keyof typeof letterRanks] -
          letterRanks[a[j].toUpperCase() as keyof typeof letterRanks]
        );
      }

      return 0;
    });
  }

  let sum = 0;
  ranks.flat().forEach((value, index) => {
    sum += bids[value] * (index + 1);
  });

  console.log("Total sum: " + sum);
}

export function day07_02() {}
