import fs from 'node:fs';
import { solve as solve1 } from './day17_1';
import { solve as solve2 } from './day17_2';

const input = fs.readFileSync(`${__dirname}/assets/input.txt`, 'utf-8');

console.log('First Result:', solve1(input).output);
console.log('Second Result:', solve2(input));
