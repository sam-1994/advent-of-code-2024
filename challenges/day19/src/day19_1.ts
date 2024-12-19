function isCombinationValid(towels: string[], combination: string): boolean {
  for(let i = 0; i < towels.length; i++) {
    const towel = towels[i];
    if(combination === towel) {
      return true;
    }
    if (combination.startsWith(towel) && isCombinationValid(towels, combination.slice(towel.length))) {
      return true;
    }
  }
  return false;
}

export function solve(input: string): number {
  const lines = input
    .split('\n')
    .filter((line) => line !== '');

  const towels = lines.shift().trim().split(', ');
  const validCombinations = lines
    .map((line) => line.trim())
    .filter((line) => isCombinationValid(towels, line));

  return validCombinations.length;
}
