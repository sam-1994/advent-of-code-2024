import * as fs from 'node:fs';
import { solve as solve1 } from './day17_1';
import { solve as solve2 } from './day17_2';

const inputExample1 = fs.readFileSync(`${__dirname}/assets/example_1.txt`, 'utf-8');
const inputExample2 = fs.readFileSync(`${__dirname}/assets/example_2.txt`, 'utf-8');
const inputExample3 = fs.readFileSync(`${__dirname}/assets/example_3.txt`, 'utf-8');
const inputExample4 = fs.readFileSync(`${__dirname}/assets/example_4.txt`, 'utf-8');
const inputExample5 = fs.readFileSync(`${__dirname}/assets/example_5.txt`, 'utf-8');
const inputExample6 = fs.readFileSync(`${__dirname}/assets/example_6.txt`, 'utf-8');
const inputExample7 = fs.readFileSync(`${__dirname}/assets/example_7.txt`, 'utf-8');

describe('Day 17', () => {
  it('should solve example 1 for part 1', () => {
    expect(solve1(inputExample1).output).toBe('4,6,3,5,6,3,5,2,1,0');
  });
  it('should solve example 2 for part 1', () => {
    expect(solve1(inputExample2).registers.B).toBe(1);
  });
  it('should solve example 3 for part 1', () => {
    expect(solve1(inputExample3).output).toBe('0,1,2');
  });
  it('should solve example 4 for part 1', () => {
    const solution = solve1(inputExample4);
    expect(solution.output).toBe('4,2,5,6,7,7,7,7,3,1,0');
    expect(solution.registers.A).toBe(0);
  });
  it('should solve example 5 for part 1', () => {
    expect(solve1(inputExample5).registers.B).toBe(26);
  });
  it('should solve example 6 for part 1', () => {
    expect(solve1(inputExample6).registers.B).toBe(44354);
  });

  it('should solve example for part 2', () => {
    expect(solve2(inputExample7)).toBe(117440);
  });
});
