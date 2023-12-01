import { readFileLines } from '../utils.ts';

export function day01_01() {
  const lines = readFileLines('day01/input.txt');
  let totalSum = 0;
  for (const line of lines) {
    const digits: number[] = line.split('').filter(char => !isNaN(+char)).map(digit => +digit);
    totalSum += (digits[0] * 10) + digits[digits.length - 1];
  }

  console.log('Total sum of all digits: ' + totalSum);
}

export function day01_02() {
  const digits = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  }
  const lines = readFileLines('day01/input.txt');

  let totalSum = 0;
  for (let line of lines) {
    let str = "";
    console.log("Line before: " + line);
    
    line
      .split('')
      .filter(char => isNaN(+char))
      .forEach(char => {/* 
        console.log('---')
        console.log("str: " + str);
        console.log("c: " + char);
        console.log("Entries: " + Object.keys(digits).some(entry => entry.startsWith(str))); */
        
        if (!Object.keys(digits).some(entry => entry.startsWith(str + char))) {
          str = "";
        }
        str += char;
        if (Object.keys(digits).find(entry => entry === str)) {
          line = line.replace(
            str,
            digits[Object.keys(digits).find((entry) => entry === str) as keyof typeof digits].toString(),
          );
          str = "";
        }
      });

    console.log('Line after: ' + line);
    const numbers: number[] = line
      .split('')
      .filter((char) => !isNaN(+char))
      .map((digit) => +digit);
    totalSum += numbers[0] * 10 + numbers[numbers.length - 1];
  }

  console.log("Total Sum: " + totalSum)
}
