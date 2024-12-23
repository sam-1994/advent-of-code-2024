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
  const prices = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => parseInt(line, 10))
    .map((number) => {
      const prices = [number%10];
      let newNumber = number;
      for (let i = 0; i < 2000; i++) {
        newNumber = nextNumber(newNumber);
        prices.push(newNumber%10);
      }
      return prices;
    });


  const globalSequenceMap = new Map<string, number>();

  prices.forEach((prices) => {
    const sequenceMap = new Map<string, number>();
    for(let i = 4; i < prices.length; i++) {
      const sequence = [];
      for(let j = 4; j > 0; j--) {
        sequence.push(prices[i-j+1] - prices[i-j]);
      }
      const sequenceString = sequence.join(',');
      if(!sequenceMap.has(sequenceString)) {
        sequenceMap.set(sequenceString, prices[i]);
      }
    }
    sequenceMap.forEach((value, key) => {
      if(!globalSequenceMap.has(key)) {
        globalSequenceMap.set(key, value);
      } else {
        globalSequenceMap.set(key, globalSequenceMap.get(key) + value);
      }
    });
  });

  let bestSequence = '';
  let bestValue = 0;

  globalSequenceMap.forEach((value, key) => {
    if (value > bestValue) {
      bestValue = value;
      bestSequence = key;
    }
  });

  console.log(`${bestSequence} -> ${bestValue}`);
  return bestValue;
}
