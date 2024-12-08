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

  if(last < result && checkCalculation(result - last, rest)) {
    return true;
  }

  const lastString = last.toString();
  const resultString = result.toString()
  if(resultString.endsWith(lastString)) {
    return checkCalculation(
      Number(resultString.substring(0, resultString.length - lastString.length)),
      rest
    );
  }

  return false;
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
