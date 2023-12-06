import { chunkString, readFileLines } from '../utils.ts';

const lines = readFileLines('day05/input.txt');
export function day05_01() {
  const seedToSoilMap: Record<string, string> = {};
  const soilToFertilizerMap: Record<string, string> = {};
  const fertilizerToWaterMap: Record<string, string> = {};
  const waterToLightMap: Record<string, string> = {};
  const lightToTemperatureMap: Record<string, string> = {};
  const temperatureToHumidityMap: Record<string, string> = {};
  const humidityToLocationMap: Record<string, string> = {};

  let seeds: number[] = [];
  let currentMap: string = '';

  const checkAndParseNumber = (
    map: Record<string, string>,
    num: number,
  ): number => {
    for (let key in map) {
      const [sourceStart, sourceEnd] = key.split('-');
      const [destStart, _] = map[key].split('-');
      if (num >= +sourceStart && num <= +sourceEnd) {
        return +destStart + (num - +sourceStart);
      }
    }

    return num;
  };

  const seedToLocation = (seed: number): number => {
    const soil = checkAndParseNumber(seedToSoilMap, seed);
    const fert = checkAndParseNumber(soilToFertilizerMap, soil);
    const water = checkAndParseNumber(fertilizerToWaterMap, fert);
    const light = checkAndParseNumber(waterToLightMap, water);
    const temp = checkAndParseNumber(lightToTemperatureMap, light);
    const humidity = checkAndParseNumber(temperatureToHumidityMap, temp);

    return checkAndParseNumber(humidityToLocationMap, humidity);
  };

  for (const line of lines) {
    if (line === '') {
      continue;
    }

    if (line.startsWith('seeds')) {
      seeds = line
        .split('seeds: ')[1]
        .split(' ')
        .filter((value) => !isNaN(+value))
        .map((value) => +value);
      continue;
    }

    if (isNaN(+line[0])) {
      let map = line.split(' ')[0];
      currentMap = map;
      continue;
    }

    const [destinationStart, sourceStart, range] = line
      .split(' ')
      .filter((value) => !isNaN(+value))
      .map((value) => +value);

    switch (currentMap) {
      case 'seed-to-soil':
        seedToSoilMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'soil-to-fertilizer':
        soilToFertilizerMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'fertilizer-to-water':
        fertilizerToWaterMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'water-to-light':
        waterToLightMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'light-to-temperature':
        lightToTemperatureMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'temperature-to-humidity':
        temperatureToHumidityMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'humidity-to-location':
        humidityToLocationMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
    }
  }

  let lowestLocation = 0;
  for (let i = 0; i < seeds.length; i++) {
    const seedToLoc = seedToLocation(seeds[i]);
    console.log('Seed: ' + seeds[i] + ' to location: ', seedToLoc);
    if (lowestLocation === 0 || lowestLocation > seedToLoc) {
      lowestLocation = seedToLoc;
    }
  }

  console.log('Nearest seed location: ' + lowestLocation);
  /* console.log('Seed-to-soil: ', seedToSoilMap);
  console.log('soil-to-fert: ', soilToFertilizerMap);
  console.log('fert-to-water: ', fertilizerToWaterMap);
  console.log('water-to-light: ', waterToLightMap);
  console.log('light-to-temp: ', lightToTemperatureMap);
  console.log('temp-to-hum: ', temperatureToHumidityMap);
  console.log('hum-to-loc: ', humidityToLocationMap); */
}

export function day05_02() {
  const seedToSoilMap: Record<string, string> = {};
  const soilToFertilizerMap: Record<string, string> = {};
  const fertilizerToWaterMap: Record<string, string> = {};
  const waterToLightMap: Record<string, string> = {};
  const lightToTemperatureMap: Record<string, string> = {};
  const temperatureToHumidityMap: Record<string, string> = {};
  const humidityToLocationMap: Record<string, string> = {};

  let seeds: number[] = [];
  let currentMap: string = '';

  const checkAndParseNumber = (
    map: Record<string, string>,
    num: number,
  ): number => {
    for (let key in map) {
      const [sourceStart, sourceEnd] = key.split('-');
      const [destStart, _] = map[key].split('-');
      if (num >= +sourceStart && num <= +sourceEnd) {
        return +destStart + (num - +sourceStart);
      }
    }

    return num;
  };

  const seedToLocation = (seed: number): number => {
    const soil = checkAndParseNumber(seedToSoilMap, seed);
    const fert = checkAndParseNumber(soilToFertilizerMap, soil);
    const water = checkAndParseNumber(fertilizerToWaterMap, fert);
    const light = checkAndParseNumber(waterToLightMap, water);
    const temp = checkAndParseNumber(lightToTemperatureMap, light);
    const humidity = checkAndParseNumber(temperatureToHumidityMap, temp);

    return checkAndParseNumber(humidityToLocationMap, humidity);
  };

  let seedsLine = '';

  for (const line of lines) {
    if (line === '') {
      continue;
    }

    if (line.startsWith('seeds')) {
      seedsLine = line;
      continue;
    }

    if (isNaN(+line[0])) {
      let map = line.split(' ')[0];
      currentMap = map;
      continue;
    }

    const [destinationStart, sourceStart, range] = line
      .split(' ')
      .filter((value) => !isNaN(+value))
      .map((value) => +value);

    switch (currentMap) {
      case 'seed-to-soil':
        seedToSoilMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'soil-to-fertilizer':
        soilToFertilizerMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'fertilizer-to-water':
        fertilizerToWaterMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'water-to-light':
        waterToLightMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'light-to-temperature':
        lightToTemperatureMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'temperature-to-humidity':
        temperatureToHumidityMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
      case 'humidity-to-location':
        humidityToLocationMap[
          `${sourceStart}-${sourceStart + (range - 1)}`
        ] = `${destinationStart}-${destinationStart + (range - 1)}`;
        break;
    }
  }

  let lowestLocation = 0;

  const list = seedsLine.split(': ')[1].split(' ');
  let start = 0;
  for (const entry of list) {
    if (start === 0) {
      start = +entry;
      continue;
    }

    const range = +entry;
    for (let j = 0; j < range; j++) {
      const seedToLoc = seedToLocation(start + j);
      if (lowestLocation === 0 || lowestLocation > seedToLoc) {
        lowestLocation = seedToLoc;
      }
    }
    start = 0;
  }

  console.log('Nearest seed location: ' + lowestLocation);
}
