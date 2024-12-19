import fs from 'node:fs';
import { solve as solve1 } from './day18_1';
import { solve as solve2 } from './day18_2';

const input = fs.readFileSync(`${__dirname}/assets/input.txt`, 'utf-8');

console.log('First Result:', solve1(input, 71, 1024));
console.log('Second Result:', solve2(input, 71, 0));
