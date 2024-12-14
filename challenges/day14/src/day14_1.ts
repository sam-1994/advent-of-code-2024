type Robot = {
  x: number;
  y: number;
  vX: number;
  vY: number;
}

type Quadrants = {
  first: number;
  second: number;
  third: number;
  fourth: number;
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

export function countQuadrants(robots: Robot[], width: number, height: number): Quadrants {
  const quadrants: Quadrants = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0
  };

  const xSplit = Math.floor(width / 2);
  const ySplit = Math.floor(height / 2);

  robots.forEach((robot) => {
    if (xSplit < robot.x) {
      if (ySplit < robot.y) {
        quadrants.first++;
      } else if (ySplit > robot.y) {
        quadrants.fourth++;
      }
    } else if (robot.x < xSplit) {
      if (ySplit < robot.y) {
        quadrants.second++;
      } else if (robot.y < ySplit) {
        quadrants.third++;
      }
    }
  });

  return quadrants;
}

export function solve(input: string, width: number, height: number): number {
  const robots = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => createRobotFromLine(line.trim()));

  robots.forEach((robot) => {
    moveRobot(robot, width, height, 100);
  });

  const quadrants = countQuadrants(robots, width, height);

  return quadrants.first * quadrants.second * quadrants.third * quadrants.fourth;
}
