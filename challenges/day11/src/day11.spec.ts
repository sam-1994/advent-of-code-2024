import * as fs from 'node:fs';
import { solve as solve1 } from './day11_1';
import { solve as solve2 } from './day11_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 11', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample, 25)).toBe(55312);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample, 25)).toBe(55312);
  });
});
