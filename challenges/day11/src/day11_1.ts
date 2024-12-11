export function getNextIteration(stones: number[]): number[] {
  const nextIteration:number[] = [];

  for(let i=0; i<stones.length; i++) {
    const value = stones[i];
    if(value === 0) {
      nextIteration.push(1);
    } else if(value.toString().length % 2 === 0) {
      const valueString = value.toString();
      nextIteration.push(Number(valueString.substring(0, valueString.length / 2)));
      nextIteration.push(Number(valueString.substring(valueString.length / 2)));
    } else {
      nextIteration.push(value * 2024);
    }
  }

  return nextIteration;
}

export function solve(input: string, iterations: number): number {
  let numbers = input.trim().split(' ').map(
    (value) => Number(value)
  );

  for(let i=0; i<iterations; i++) {
    numbers = getNextIteration(numbers);
  }
  return numbers.length;
}
