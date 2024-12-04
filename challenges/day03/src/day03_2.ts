function extractMultiplications(line: string): string[] {
  const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
  const matches = [...line.matchAll(regex)];

  let enabled = true;
  return matches
    .map((match) => match[0])
    .reduce((multiplications, match) => {
      switch (match) {
        case 'do()':
          enabled = true;
          return multiplications;
        case 'don\'t()':
          enabled = false;
          return multiplications;
        default:
          if(enabled) {
            multiplications.push(match);
          }
          return multiplications;
      }
    }, []);
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
