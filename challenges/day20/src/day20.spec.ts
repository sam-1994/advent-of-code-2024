import * as fs from 'node:fs';
import { solve as solve1 } from './day20_1';
import { solve as solve2 } from './day20_2';

const inputExample = fs.readFileSync(`${__dirname}/assets/example.txt`, 'utf-8');

describe('Day 20', () => {
  it('should solve example for part 1 with 2 seconds', () => {
    expect(solve1(inputExample, 2)).toBe(44);
  });
  it('should solve example for part 1 with 4 seconds', () => {
    expect(solve1(inputExample, 4)).toBe(30);
  });
  it('should solve example for part 1 with 6 seconds', () => {
    expect(solve1(inputExample, 6)).toBe(16);
  });
  it('should solve example for part 1 with 8 seconds', () => {
    expect(solve1(inputExample, 8)).toBe(14);
  });
  it('should solve example for part 1 with 10 seconds', () => {
    expect(solve1(inputExample, 10)).toBe(10);
  });
  it('should solve example for part 1 with 12 seconds', () => {
    expect(solve1(inputExample, 12)).toBe(8);
  });
  it('should solve example for part 1 with 20 seconds', () => {
    expect(solve1(inputExample, 20)).toBe(5);
  });
  it('should solve example for part 1 with 36 seconds', () => {
    expect(solve1(inputExample, 36)).toBe(4);
  });
  it('should solve example for part 1 with 38 seconds', () => {
    expect(solve1(inputExample, 38)).toBe(3);
  });
  it('should solve example for part 1 with 40 seconds', () => {
    expect(solve1(inputExample, 40)).toBe(2);
  });
  it('should solve example for part 1 with 64 seconds', () => {
    expect(solve1(inputExample, 64)).toBe(1);
  });
  it('should solve example for part 1 with 65 seconds', () => {
    expect(solve1(inputExample, 65)).toBe(0);
  });

  it('should solve example for part 2 with 50 seconds', () => {
    expect(solve2(inputExample, 50)).toBe(285);
  });
  it('should solve example for part 2 with 52 seconds', () => {
    expect(solve2(inputExample, 52)).toBe(253);
  });
  it('should solve example for part 2 with 54 seconds', () => {
    expect(solve2(inputExample, 54)).toBe(222);
  });
  it('should solve example for part 2 with 56 seconds', () => {
    expect(solve2(inputExample, 56)).toBe(193);
  });
  it('should solve example for part 2 with 58 seconds', () => {
    expect(solve2(inputExample, 58)).toBe(154);
  });
  it('should solve example for part 2 with 60 seconds', () => {
    expect(solve2(inputExample, 60)).toBe(129);
  });
  it('should solve example for part 2 with 62 seconds', () => {
    expect(solve2(inputExample, 62)).toBe(106);
  });
  it('should solve example for part 2 with 64 seconds', () => {
    expect(solve2(inputExample, 64)).toBe(86);
  });
  it('should solve example for part 2 with 66 seconds', () => {
    expect(solve2(inputExample, 66)).toBe(67);
  });
  it('should solve example for part 2 with 68 seconds', () => {
    expect(solve2(inputExample, 68)).toBe(55);
  });
  it('should solve example for part 2 with 70 seconds', () => {
    expect(solve2(inputExample, 70)).toBe(41);
  });
  it('should solve example for part 2 with 72 seconds', () => {
    expect(solve2(inputExample, 72)).toBe(29);
  });
  it('should solve example for part 2 with 74 seconds', () => {
    expect(solve2(inputExample, 74)).toBe(7);
  });
  it('should solve example for part 2 with 76 seconds', () => {
    expect(solve2(inputExample, 76)).toBe(3);
  });
});
