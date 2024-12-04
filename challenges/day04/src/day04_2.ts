function checkXMAS(map: string[][], row: number, column: number): boolean {
  const charTopLeft = map[row-1][column-1];
  const charTopRight = map[row-1][column+1];
  const charBottomLeft = map[row+1][column-1];
  const charBottomRight = map[row+1][column+1];

  if([charTopLeft, charTopRight, charBottomLeft, charBottomRight].some((char) => char !== 'M' && char !== 'S')) {
    return false;
  }

  return charTopLeft !== charBottomRight && charTopRight !== charBottomLeft;
}

function countXMAS(map: string[][]): number {
  let count = 0;
  for(let i = 1; i < map.length - 1; i++) {
    for(let j = 1; j < map[i].length - 1; j++) {
      if (map[i][j] === 'A' && checkXMAS(map, i, j)) {
        count++;
      }
    }
  }
  return count;
}

export function solve(input: string): number {
  const map = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => line.split(''));

  return countXMAS(map);
}
