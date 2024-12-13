import * as fs from 'node:fs';
import { solve as solve1 } from './day12_1';
import { solve as solve2 } from './day12_2';

const inputExample1 = fs.readFileSync(`${__dirname}/assets/example_1.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');
const inputExample3 = fs.readFileSync(`${__dirname}/assets/example_3.txt`, 'utf-8');
const inputExample4 = fs.readFileSync(`${__dirname}/assets/example_4.txt`, 'utf-8');
const inputExample5 = fs.readFileSync(`${__dirname}/assets/example_5.txt`, 'utf-8');

describe('Day 12', () => {
  it('should solve example 1 for part 1', () => {
    expect(solve1(inputExample1)).toBe(140);
  });
  it('should solve example 2 for part 1', () => {
    expect(solve1(inputExample2)).toBe(772);
  });
  it('should solve example 3 for part 1', () => {
    expect(solve1(inputExample3)).toBe(1930);
  });

  it('should solve example 1 for part 2', () => {
    expect(solve2(inputExample1)).toBe(80);
  });

  it('should solve example 2 for part 2', () => {
    expect(solve2(inputExample2)).toBe(436);
  });

  it('should solve example 3 for part 2', () => {
    expect(solve2(inputExample3)).toBe(1206);
  });

  it('should solve example 4 for part 2', () => {
    expect(solve2(inputExample4)).toBe(236);
  });

  it('should solve example 5 for part 2', () => {
    expect(solve2(inputExample5)).toBe(368);
  });
});
