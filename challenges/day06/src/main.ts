import fs from 'node:fs';
import { solve as solve1 } from './day06_1';
import { solve as solve2 } from './day06_2';

const input = fs.readFileSync(`${__dirname}/assets/input.txt`, 'utf-8');

console.log('First Result:', solve1(input));
console.log('Second Result:', solve2(input));
