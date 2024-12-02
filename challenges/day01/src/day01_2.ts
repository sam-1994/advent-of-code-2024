export function solve(input: string): number {
  const firstNumbers = [];
  const secondNumbers = [];

  input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
        const [first, second] = line.split(' ').filter((x) => x !== '');
        return { first: parseInt(first), second: parseInt(second) };
      }
    )
    .forEach(({ first, second }) => {
      firstNumbers.push(first);
      secondNumbers.push(second);
    });

  let result = 0;

  for(let i=0; i<firstNumbers.length; i++) {
    result += firstNumbers[i] * secondNumbers.filter((x) => x === firstNumbers[i]).length;
  }

  return result;
}
