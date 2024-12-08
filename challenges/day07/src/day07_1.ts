type Calculation = {
  result: number;
  numbers: number[];
}

function checkCalculation(result: number, numbers: number[]): boolean {
  if(numbers.length < 2) {
    return numbers[0] === result;
  }
  const rest = [...numbers];
  const last = rest.pop();

  if(result % last === 0 && checkCalculation(result / last, rest)) {
    return true;
  }

  return last < result && checkCalculation(result - last, rest);
}

function sumCheckedResults(calculations: Calculation[]): number {
  let sum = 0;
  for (const calculation of calculations) {
    if (checkCalculation(calculation.result, calculation.numbers)) {
      sum += calculation.result;
    }
  }
  return sum;
}

export function solve(input: string): number {
  const calculations: Calculation[] = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      const numbers = line.split(' ').map((n) => parseInt(n, 10));
      return {
        result: numbers.shift(),
        numbers,
      };
    });

  return sumCheckedResults(calculations);
}
