type Coordinate = {
  x: number;
  y: number;
}

type Trail = Coordinate[]

function findTrails(
  map: number[][],
  x: number,
  y: number,
  currentNumber: number,
): Trail[] {
  if (currentNumber === 9) {
    return [[{ x, y }]];
  }

  const trails: Trail[] = [];
  if (0 < x && map[y][x - 1] === currentNumber + 1) {
    const leftTrails = findTrails(map, x - 1, y, currentNumber + 1).map(
      (trail) => [{ x, y }, ...trail]
    );
    trails.push(...leftTrails);
  }

  if (0 < y && map[y - 1][x] === currentNumber + 1) {
    const topTrails = findTrails(map, x, y - 1, currentNumber + 1).map(
      (trail) => [{ x, y }, ...trail]
    );
    trails.push(...topTrails);
  }

  if (x < map[y].length - 1 && map[y][x + 1] === currentNumber + 1) {
    const rightTrails = findTrails(map, x + 1, y, currentNumber + 1).map(
      (trail) => [{ x, y }, ...trail]
    );
    trails.push(...rightTrails);
  }

  if (y < map.length - 1 && map[y + 1][x] === currentNumber + 1) {
    const bottomTrails = findTrails(map, x, y + 1, currentNumber + 1).map(
      (trail) => [{ x, y }, ...trail]
    );
    trails.push(...bottomTrails);
  }
  return trails;
}

export function solve(input: string): number {
  const map = input
    .split('\n')
    .filter((line) => line !== '')
    .map((
      line) => line
      .split('')
      .map((char) => parseInt(char))
    );

  let trailsCount = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        const trails = findTrails(map, x, y, map[y][x]);
        // console.log(x, y, trails.length);
        trailsCount += trails.length;
      }
    }
  }

  return trailsCount;
}
