import fs from 'node:fs';
import { solve as solve1 } from './day14_1';
import { solve as solve2 } from './day14_2';

const input = fs.readFileSync(`${__dirname}/assets/input.txt`, 'utf-8');

console.log('First Result:', solve1(input, 101, 103));
console.log('Second Result:');
solve2(input, 101, 103)
