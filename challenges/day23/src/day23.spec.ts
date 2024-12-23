import * as fs from 'node:fs';
import { solve as solve1 } from './day23_1';
import { solve as solve2 } from './day23_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 23', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample)).toBe(7);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample)).toBe('co,de,ka,ta');
  });
});
