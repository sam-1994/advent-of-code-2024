import * as fs from 'node:fs';
import { solve as solve1 } from './day10_1';
import { solve as solve2 } from './day10_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 10', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample)).toBe(36);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample)).toBe(0);
  });
});
