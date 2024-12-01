export function solve1(input: string): number {
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

  firstNumbers.sort();
  secondNumbers.sort();

  let result = 0;
  for(let i=0; i<firstNumbers.length; i++) {
    result += Math.abs(firstNumbers[i] - secondNumbers[i]);
  }
  return result;
}
