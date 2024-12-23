import * as fs from 'node:fs';
import { nextNumber as nextNumber1, solve as solve1 } from './day22_1';
import { solve as solve2 } from './day22_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');

describe('Day 22', () => {

  const nextNumbers = [15887950, 16495136, 527345, 704524, 1553684, 12683156, 11100544, 12249484, 7753432, 5908254];

  for (let i = 0; i < nextNumbers.length; i++) {
    it(`should return correct next numbers for part 1 after ${i+1} itterations`, () => {
      let number = 123;
      for (let j = 0; j <= i; j++) {
        number = nextNumber1(number);
      }
      expect(number).toBe(nextNumbers[i]);
    });
  }

  it('should solve example for part 1', () => {
    expect(solve1(inputExample)).toBe(37327623);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample2)).toBe(23);
  });
});
