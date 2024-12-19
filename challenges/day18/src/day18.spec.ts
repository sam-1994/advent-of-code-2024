import * as fs from 'node:fs';
import { solve as solve1 } from './day18_1';
import { solve as solve2 } from './day18_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 18', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample, 7, 12)).toBe(22);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample, 7)).toBe('6,1');
  });
});
