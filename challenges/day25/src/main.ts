import fs from 'node:fs';
import { solve as solve1 } from './day25_1';

const input = fs.readFileSync(`${__dirname}/assets/input.txt`, 'utf-8');

console.log('First Result:', solve1(input));
