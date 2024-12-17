import * as fs from 'node:fs';
import { solve as solve1 } from './day15_1';
import { solve as solve2 } from './day15_2';

const inputExample1 = fs.readFileSync(`${__dirname}/assets/example_1.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');
const inputExample3 = fs.readFileSync(`${__dirname}/assets/example_3.txt`, 'utf-8');

describe('Day 15', () => {
  it('should solve example 1 for part 1', () => {
    expect(solve1(inputExample1)).toBe(10092);
  });

  it('should solve example 2 for part 1', () => {
    expect(solve1(inputExample2)).toBe(2028);
  });

  it('should solve example 1 for part 2', () => {
    expect(solve2(inputExample1)).toBe(9021);
  });

  it('should solve example 3 for part 2', () => {
    expect(solve2(inputExample3)).toBe(105);
  });
});
