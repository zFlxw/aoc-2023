import { readFileLines } from '../utils.ts';

const letterRanks = {
  A: 0,
  K: 1,
  Q: 2,
  J: 3,
  T: 4,
  9: 5,
  8: 6,
  7: 7,
  6: 8,
  5: 9,
  4: 10,
  3: 11,
  2: 12,
};

export function day07_01() {
  const ratings: Record<string, number> = {};
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

    ratings[hand] = rating;
    console.log("Rating of " + hand + ": ", rating)
  });
  console.log("---")

  for (const hand in ratings) {
    const rating = ratings[hand];
    if (!ranks[rating]) {
      ranks[rating] = [hand];
    } else {
      middle:
      for (let k = 0; k < ranks[rating].length; k++) {
        const rank = ranks[rating][k];
        for (let i = 0; i < rank.length; i++) {

          const letter = rank[i];
          const currentRank =
            letterRanks[letter.toUpperCase() as keyof typeof letterRanks];
          const newRank = letterRanks[hand[i] as keyof typeof letterRanks];
          if (currentRank === newRank) {
            continue;
          }

          if (currentRank > newRank) {
            ranks[rating].push(hand);
          } else {
            ranks[rating].splice(k, 0, hand);
          }

          break middle;
        }
      }
    }
  }

  console.log("final ranking: ", ranks)

  let sum = 0;
  ranks.flat().forEach((value, index) => sum += bids[value] * (index + 1));
  console.log(sum);
}

export function day07_02() {}
