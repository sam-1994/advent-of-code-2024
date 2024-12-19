import fs from 'node:fs';

type Position = {
  x: number;
  y: number;
}

type PathPosition = Position & {
  distance: number;
  estimation: number;
  path: Position[];
}

// let mapCount = 0;

function printMap(map: string[][]): void {
  const mapString = map.map((row) => row
    .map((field) => field.toString().padStart(4, ' '))
    .join('')
  ).join('\n');

  // fs.writeFileSync(`${__dirname}/outputs/map_${mapCount++}.txt`, mapString);
}

function copyMap(map: string[][]): string[][] {
  return map.map((row) => row.slice());
}

function findShortestPath(map: string[][], start: Position, end: Position): PathPosition | undefined {
  const queue: PathPosition[] = [{
    x: start.x,
    y: start.y,
    distance: 0,
    estimation: map.length - 1 + map[0].length - 1,
    path: [start]
  }];

  while (queue.length > 0) {
    // find lowest estimation
    const minIndex = queue.findIndex(
      (position) => position.estimation === Math.min(
        ...queue.map((p) => p.estimation)
      )
    );
    const current = queue.splice(minIndex, 1)[0];

    const currentDistance = Number(map[current.y][current.x]);
    if (Number.isInteger(currentDistance) && currentDistance <= current.distance) {
      continue;
    }

    map[current.y][current.x] = `${current.distance}`;
    printMap(map);

    if (current.x === end.x && current.y === end.y) {
      return current;
    }

    if (current.x > 0 && map[current.y][current.x - 1] !== '#') {
      const leftField = Number(map[current.y][current.x - 1]);
      if (!Number.isInteger(leftField) || leftField > current.distance + 1) {
        queue.push({
          x: current.x - 1,
          y: current.y,
          distance: current.distance + 1,
          estimation: current.distance + 1 + end.x - current.x - 1 + end.y - current.y,
          path: [...current.path, { x: current.x - 1, y: current.y }]
        });
      }
    }
    if (current.x < map[0].length - 1 && map[current.y][current.x + 1] !== '#') {
      const rightField = Number(map[current.y][current.x + 1]);
      if (!Number.isInteger(rightField) || rightField > current.distance + 1) {
        queue.push({
          x: current.x + 1,
          y: current.y,
          distance: current.distance + 1,
          estimation: current.distance + 1 + end.x - current.x + 1 + end.y - current.y,
          path: [...current.path, { x: current.x + 1, y: current.y }]
        });
      }
    }
    if (current.y > 0 && map[current.y - 1][current.x] !== '#') {
      const topField = Number(map[current.y - 1][current.x]);
      if (!Number.isInteger(topField) || topField > current.distance + 1) {
        queue.push({
          x: current.x,
          y: current.y - 1,
          distance: current.distance + 1,
          estimation: current.distance + 1 + end.x - current.x + end.y - current.y - 1,
          path: [...current.path, { x: current.x, y: current.y - 1 }]
        });
      }
    }
    if (current.y < map.length - 1 && map[current.y + 1][current.x] !== '#') {
      const bottomField = Number(map[current.y + 1][current.x]);
      if (!Number.isInteger(bottomField) || bottomField > current.distance + 1) {
        queue.push({
          x: current.x,
          y: current.y + 1,
          distance: current.distance + 1,
          estimation: current.distance + 1 + end.x - current.x + end.y - current.y + 1,
          path: [...current.path, { x: current.x, y: current.y + 1 }]
        });
      }
    }
  }
}

export function solve(input: string, gridSize: number, startByte = 0): string {
  fs.mkdirSync(__dirname + '/outputs', { recursive: true });

  const positions: Position[] = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      const parts = line.trim().split(',');
      return {
        x: parseInt(parts[0], 10),
        y: parseInt(parts[1], 10)
      };
    });

  let byteCount = startByte;
  let currentPath: PathPosition;

  do {
    byteCount++;

    if (currentPath) {
      if (!currentPath.path.some(
        (position) => position.x === positions[byteCount].x && position.y === positions[byteCount].y
      )) {
        continue;
      }
    }

    const currentPositions = positions.slice(0, byteCount + 1);

    const map: string[][] = Array.from(
      { length: gridSize },
      () => Array.from(
        { length: gridSize },
        () => '.'
      )
    );

    currentPositions.forEach((position) => {
      map[position.y][position.x] = '#';
    });

    currentPath = findShortestPath(map, { x: 0, y: 0 }, { x: gridSize - 1, y: gridSize - 1 });

    console.log(`${byteCount}: ${positions[byteCount].x},${positions[byteCount].y} --> ${currentPath?.distance}`)
  } while (byteCount < positions.length && currentPath);

  return `${positions[byteCount].x},${positions[byteCount].y}`;
}
