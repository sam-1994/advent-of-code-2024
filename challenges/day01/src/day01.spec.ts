import * as fs from 'node:fs';
import { solve1 } from './day01_1';
import { solve2 } from './day01_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 01', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample)).toBe(11);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample)).toBe(31);
  });
});
