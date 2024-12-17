type Position = {
  x: number;
  y: number;
}

type Direction = {
  dx: number;
  dy: number;
}

const DIRECTIONS: { [name: string]: Direction } = {
  ['^']: { dx: 0, dy: -1 },
  ['>']: { dx: 1, dy: 0 },
  ['v']: { dx: 0, dy: 1 },
  ['<']: { dx: -1, dy: 0 }
};

type DIR = '^' | '>' | 'v' | '<';

function move(map: string[][], robot: Position, dir: DIR): void {
  const direction = DIRECTIONS[dir];

  const nextDotOrBlock: Position = {
    x: robot.x + direction.dx,
    y: robot.y + direction.dy
  };

  while (map[nextDotOrBlock.y][nextDotOrBlock.x] !== '#' && map[nextDotOrBlock.y][nextDotOrBlock.x] !== '.') {
    nextDotOrBlock.x += direction.dx;
    nextDotOrBlock.y += direction.dy;
  }

  if (map[nextDotOrBlock.y][nextDotOrBlock.x] === '#') {
    return;
  }

  robot.x += direction.dx;
  robot.y += direction.dy;

  if (robot.x !== nextDotOrBlock.x || robot.y !== nextDotOrBlock.y) {
    map[robot.y][robot.x] = '.';
    map[nextDotOrBlock.y][nextDotOrBlock.x] = 'O';
  }
}

function printMap(map: string[][], robot: Position): void {
  const mapCopy = map.map((line) => [...line]);
  mapCopy[robot.y][robot.x] = '@';
  console.log(mapCopy.map((line) => line.join('')).join('\n'));
}

function calculateBoxValues(map: string[][]): number {
  let value = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        const blockValue = 100 * y + x;
        value += blockValue;
      }
    }
  }

  return value;
}

export function solve(input: string): number {
  const [mapInput, commandsInput] = input.split('\n\n');

  const map = mapInput.split('\n').map(
    (row) => row.trim().split('')
  );

  let x = -1;
  let y = -1;
  let found = false;

  for (let i = 0; !found && i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '@') {
        x = i;
        y = j;
        map[i][j] = '.';
        found = true;
        break;
      }
    }
  }

  const commands = commandsInput.replace(/\s+/g, '').split('');
  const robot: Position = {
    x,
    y
  };

  commands.forEach((command) => {
    move(map, robot, command as DIR);
  });

  return calculateBoxValues(map);
}
