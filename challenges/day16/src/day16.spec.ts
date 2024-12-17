import * as fs from 'node:fs';
import { solve as solve1 } from './day16_1';
import { solve as solve2 } from './day16_2';

const inputExample1 = fs.readFileSync(`${__dirname}/assets/example_1.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');
const inputExample3 = fs.readFileSync(`${__dirname}/assets/example_3.txt`, 'utf-8');
const inputExample4 = fs.readFileSync(`${__dirname}/assets/example_4.txt`, 'utf-8');

describe('Day 16', () => {
  it('should solve example 1 for part 1', () => {
    expect(solve1(inputExample1)).toBe(7036);
  });
  it('should solve example 2 for part 1', () => {
    expect(solve1(inputExample2)).toBe(11048);
  });
  it('should solve example 3 for part 1', () => {
    expect(solve1(inputExample3)).toBe(21148);
  });
  it('should solve example 4 for part 1', () => {
    expect(solve1(inputExample4)).toBe(5078);
  });

  it('should solve example 1 for part 2', () => {
    expect(solve2(inputExample1)).toBe(45);
  });
  it('should solve example 2 for part 2', () => {
    expect(solve2(inputExample2)).toBe(64);
  });
  it('should solve example 3 for part 2', () => {
    expect(solve2(inputExample3)).toBe(149);
  });
  it('should solve example 4 for part 2', () => {
    expect(solve2(inputExample4)).toBe(413);
  });
});
