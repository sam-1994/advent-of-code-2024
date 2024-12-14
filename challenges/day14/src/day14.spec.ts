import * as fs from 'node:fs';
import { solve as solve1 } from './day14_1';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 14', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample, 11, 7)).toBe(12);
  });
});
