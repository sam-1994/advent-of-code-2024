import * as fs from 'node:fs';
import { solve as solve1 } from './day13_1';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 13', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample)).toBe(480);
  });
});
