import fs from 'node:fs';
const { createCanvas } = require('canvas');

const RENDERING_COUNT = 11000;

type Robot = {
  x: number;
  y: number;
  vX: number;
  vY: number;
}

function createRobotFromLine(line: string): Robot {
  const split = line.split(' ');
  const positions = split[0].substring(2).split(',');
  const velocities = split[1].substring(2).split(',');

  const x = parseInt(positions[0]);
  const y = parseInt(positions[1]);
  const vX = parseInt(velocities[0]);
  const vY = parseInt(velocities[1]);

  return {
    x,
    y,
    vX,
    vY
  };
}

export function moveRobot(robot: Robot, maxX: number, maxY: number, seconds: number): void {
  let x = (robot.x + seconds * robot.vX) % maxX;
  let y = (robot.y + seconds * robot.vY) % maxY;

  if (x < 0) {
    x = maxX + x;
  }
  if (y < 0) {
    y = maxY + y;
  }

  robot.x = x;
  robot.y = y;
}

export function printGrid(robots: Robot[], width: number, height: number, count: number): void {
  const grid: string[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => '.'));

  robots.forEach((robot) => {
    grid[robot.y][robot.x] = '#';
  });

  // Most likely at least 20% of the robots should have a neighbour to the right if they are building an image of a Christmas tree
  const countRobotsWithRightNeighbour = robots.filter((robot) => grid[robot.y][robot.x + 1] === '#').length;
  if(countRobotsWithRightNeighbour < robots.length * 0.2) {
    return;
  }
  console.log(`${count} seconds: ${countRobotsWithRightNeighbour} neighbours`);

  const cellSize = 4; // Größe jeder Zelle in Pixel
  const imgWidth = width * cellSize;
  const imgHeight = height * cellSize;
  const canvas = createCanvas(imgWidth, imgHeight);
  const ctx = canvas.getContext('2d');

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // Setze die Füllfarbe basierend auf dem Inhalt der Zelle
      ctx.fillStyle = grid[row][col] === '#' ? 'black' : 'white';
      // Zeichne das Rechteck
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync( `${__dirname}/outputs/${count}.png`, buffer);
}

export function printNextGrid(robots: Robot[], width: number, height: number, count: number): void {
  robots.forEach((robot) => {
    moveRobot(robot, width, height, 1);
  });
  printGrid(robots, width, height, count);
}

export function solve(input: string, width: number, height: number): void {
  const robots = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => createRobotFromLine(line.trim()));

  fs.mkdirSync(__dirname + '/outputs', { recursive: true });

  printGrid(robots, width, height, 0);
  for(let i=1; i<=RENDERING_COUNT; i++) {
    printNextGrid(robots, width, height, i);
  }
}
