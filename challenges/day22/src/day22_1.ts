export function nextNumber(number: number): number {
  // console.log(0, number);
  let secretNumber = ((number * 64) ^ number) % 16777216;
  // console.log(1, secretNumber);
  secretNumber = (Math.floor(secretNumber / 32) ^ secretNumber) % 16777216;
  // console.log(2, secretNumber);
  secretNumber = ((secretNumber * 2048) ^ secretNumber) % 16777216;
  // console.log(3, secretNumber);
  if(secretNumber < 0) {
    secretNumber = 16777216 + secretNumber;
  }
  return secretNumber;
}

export function solve(input: string): number {
  const newNumbers = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => parseInt(line, 10))
    .map((number, index) => {
      let newNumber = number;
      for (let i = 0; i < 2000; i++) {
        newNumber = nextNumber(newNumber);
      }
      return newNumber;
    });

  return newNumbers.reduce((acc, number) => acc + number, 0);
}
