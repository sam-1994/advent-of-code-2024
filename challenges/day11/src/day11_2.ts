//           Map<stone, Map<blinks, count>>
const cache: Map<number, Map<number, number>> = new Map();

export function getNextFinalStoneCount(stone: number, blinks: number): number {
  if (blinks === 0) {
    return 1;
  }
  if (cache.get(stone)?.has(blinks)) {
    return cache.get(stone).get(blinks);
  }

  let finalCount: number;

  if (stone === 0) {
    finalCount = getNextFinalStoneCount(1, blinks - 1);
  } else if (stone.toString().length % 2 === 0) {
    const valueString = stone.toString();
    const firstPart = Number(valueString.substring(0, valueString.length / 2));
    const secondPart = Number(valueString.substring(valueString.length / 2));
    finalCount = getNextFinalStoneCount(firstPart, blinks - 1) + getNextFinalStoneCount(secondPart, blinks - 1);
  } else {
    finalCount = getNextFinalStoneCount(stone * 2024, blinks - 1);
  }

  let stoneCache = cache.get(stone);
  if (!stoneCache) {
    stoneCache = new Map();
    cache.set(stone, stoneCache);
  }

  stoneCache.set(blinks, finalCount);
  return finalCount;
}

export function solve(input: string, blinks: number): number {
  const numbers = input.trim().split(' ').map(
    (value) => Number(value)
  );

  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    count += getNextFinalStoneCount(numbers[i], blinks);
  }
  return count;
}
