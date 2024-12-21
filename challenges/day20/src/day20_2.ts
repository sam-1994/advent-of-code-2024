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

const scoreMap: Map<number, Position> = new Map();

function searchOriginalPath(map: string[][], start: Position, end: Position): number {
  let score = 0;
  let x = start.x;
  let y = start.y;

  while (x !== end.x || y !== end.y) {
    score++;
    if (map[y][x - 1] === '.') {
      map[y][x - 1] = score.toString();
      scoreMap.set(score, { x: x - 1, y });
      x--;
      continue;
    }
    if (map[y][x + 1] === '.') {
      map[y][x + 1] = score.toString();
      scoreMap.set(score, { x: x + 1, y });
      x++;
      continue;
    }
    if (map[y - 1][x] === '.') {
      map[y - 1][x] = score.toString();
      scoreMap.set(score, { x, y: y - 1 });
      y--;
      continue;
    }
    if (map[y + 1][x] === '.') {
      map[y + 1][x] = score.toString();
      scoreMap.set(score, { x, y: y + 1 });
      y++;
      continue;
    }
  }

  return score;
}

function searchCheatCount(map: string[][], saveSeconds: number): number {
  let cheatCount = 0;

  for (let i = 0; i < scoreMap.size; i++) {
    for (let j = i + 1; j < scoreMap.size; j++) {
      const position1 = scoreMap.get(i);
      const position2 = scoreMap.get(j);

      const x1 = position1.x;
      const y1 = position1.y;
      const x2 = position2.x;
      const y2 = position2.y;
      const cheatSize = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      const wayLength = j - i;
      if (cheatSize <= 20 && cheatSize < wayLength && wayLength - cheatSize >= saveSeconds) {
        cheatCount++;
      }
    }
  }
  return cheatCount;
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

  scoreMap.set(0, start);
  const originalScore = searchOriginalPath(map, start, end);
  console.log('Original', originalScore);

  return searchCheatCount(map, saveSeconds);
}
