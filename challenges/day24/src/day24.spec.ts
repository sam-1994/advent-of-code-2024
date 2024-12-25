import * as fs from 'node:fs';
import { solve as solve1 } from './day24_1';
import { solve as solve2 } from './day24_2';

const inputExample1 = fs.readFileSync(`${__dirname}/assets/example_1.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');

describe('Day 24', () => {
  it('should solve example for part 1', () => {
    expect(solve1(inputExample1)).toBe(2024);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample2)).toBe('z00,z01,z02,z05');
  });
});
