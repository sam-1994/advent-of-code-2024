import * as fs from 'node:fs';
import { solve as solve1 } from './day03_1';
import { solve as solve2 } from './day03_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');

describe('Day 03', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample)).toBe(161);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample2)).toBe(48);
  });
});
