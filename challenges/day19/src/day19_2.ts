const cache: Map<string, number> = new Map();

function countValidCombinations(towels: string[], combination: string): number {
  if(cache.has(combination)) {
    return cache.get(combination);
  }
  let count = 0;
  for(let i = 0; i < towels.length; i++) {
    const towel = towels[i];
    if(combination === towel) {
      count++;
    }
    if (combination.startsWith(towel)) {
      count += countValidCombinations(towels, combination.slice(towel.length));
    }
  }
  cache.set(combination, count);
  return count;
}

export function solve(input: string): number {
  const lines = input
    .split('\n')
    .filter((line) => line !== '');

  const towels = lines.shift().trim().split(', ');
  return lines
    .map((line) => line.trim())
    .reduce((count, line) => count + countValidCombinations(towels, line), 0);
}
