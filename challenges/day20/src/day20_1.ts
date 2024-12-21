type Position = {
  x: number;
  y: number;
}

const DIRECTIONS = {
  left: {
    x: -1,
    y: 0
  },
  right: {
    x: 1,
    y: 0
  },
  up: {
    x: 0,
    y: -1
  },
  down: {
    x: 0,
    y: 1
  }
};

function printMap(map: string[][]): void {
  console.log(map.map((row) => row.join('')).join('\n'));
}

function getNeighbours(map: string[][], position: Position): number[] {
  const neighbours: number[] = [];

  Object.keys(DIRECTIONS).forEach((direction) => {
    const newPosition = {
      x: position.x + DIRECTIONS[direction].x,
      y: position.y + DIRECTIONS[direction].y
    };
    if (0 <= newPosition.y && newPosition.y < map.length && 0 <= newPosition.x && newPosition.x < map[newPosition.y].length) {
      if (map[newPosition.y][newPosition.x] !== '#') {
        neighbours.push(Number(map[newPosition.y][newPosition.x]));
      }
    }
  });

  return neighbours;
}

function searchOriginalPath(map: string[][], start: Position, end: Position): number {
  let score = 0;
  let x = start.x;
  let y = start.y;

  while (x !== end.x || y !== end.y) {
    score++;
    if (map[y][x - 1] === '.') {
      map[y][x - 1] = score.toString();
      x--;
      continue;
    }
    if (map[y][x + 1] === '.') {
      map[y][x + 1] = score.toString();
      x++;
      continue;
    }
    if (map[y - 1][x] === '.') {
      map[y - 1][x] = score.toString();
      y--;
      continue;
    }
    if (map[y + 1][x] === '.') {
      map[y + 1][x] = score.toString();
      y++;
      continue;
    }
  }

  return score;
}

function searchPositionsForCheating(map: string[][], saveSeconds: number): Position[] {
  const cheats: Position[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const field = map[y][x];
      if (field !== '#') {
        continue;
      }
      const position: Position = { x, y };
      const neighbours = getNeighbours(map, position);
      const canBeCheat = neighbours.some(
        (neighbour) => neighbours.filter(
          (neighbour2) => neighbour2 < neighbour
        ).some(
          (neighbour2) => {
            const difference = neighbour - neighbour2;
            return saveSeconds <= difference - 2;
          }
        )
      );
      if (canBeCheat) {
        cheats.push(position);
      }

    }
  }
  return cheats;
}

export function solve(input: string, saveSeconds: number): number {
  const map = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => line.trim().split(''));


  let xStart = -1;
  let yStart = -1;
  let foundStart = false;
  let xEnd = -1;
  let yEnd = -1;
  let foundEnd = false;

  for (let i = 0; (!foundEnd || !foundStart) && i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = map[i][j];
      if (cell === 'S') {
        xStart = j;
        yStart = i;
        foundStart = true;
        map[i][j] = '0';
        break;
      } else if (cell === 'E') {
        xEnd = j;
        yEnd = i;
        foundEnd = true;
        map[i][j] = '.';
        break;
      }
    }
  }

  const start: Position = {
    x: xStart,
    y: yStart
  };

  const end: Position = {
    x: xEnd,
    y: yEnd
  };

  const originalScore = searchOriginalPath(map, start, end);
  console.log('Original', originalScore);

  const cheatPositions = searchPositionsForCheating(map, saveSeconds);

  cheatPositions.forEach((position) => {
    console.log('Cheat', position);
  });

  return cheatPositions.length;
}
