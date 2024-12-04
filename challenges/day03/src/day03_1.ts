function extractMultiplications(line: string): string[] {
  const regex = /mul\(\d+,\d+\)/g;
  const matches = [...line.matchAll(regex)];
  return matches.map((match) => match[0]);
}

function multiply(multiplication: string): number {
  const numbers = multiplication.match(/\d+/g).map(Number);
  return numbers[0] * numbers[1];
}

export function solve(input: string): number {
  const multiplications = extractMultiplications(input);

  return multiplications.reduce((res, multiplication) => {
    const value = multiply(multiplication);
    return res + value;
  }, 0);
}
