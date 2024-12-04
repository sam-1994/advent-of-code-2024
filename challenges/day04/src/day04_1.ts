function checkTopLeft(map: string[][], row: number, column: number): boolean {
  if(map[row - 1][column - 1] !== 'M') {
    return false;
  }
  if(map[row - 2][column - 2] !== 'A') {
    return false;
  }
  if(map[row - 3][column - 3] !== 'S') {
    return false;
  }
  return true;
}

function checkTopRight(map: string[][], row: number, column: number): boolean {
  if(map[row - 1][column + 1] !== 'M') {
    return false;
  }
  if(map[row - 2][column + 2] !== 'A') {
    return false;
  }
  if(map[row - 3][column + 3] !== 'S') {
    return false;
  }
  return true;
}

function checkBottomLeft(map: string[][], row: number, column: number): boolean {
  if(map[row + 1][column - 1] !== 'M') {
    return false;
  }
  if(map[row + 2][column - 2] !== 'A') {
    return false;
  }
  if(map[row + 3][column - 3] !== 'S') {
    return false;
  }
  return true;
}

function checkBottomRight(map: string[][], row: number, column: number): boolean {
  if(map[row + 1][column + 1] !== 'M') {
    return false;
  }
  if(map[row + 2][column + 2] !== 'A') {
    return false;
  }
  if(map[row + 3][column + 3] !== 'S') {
    return false;
  }
  return true;
}

function checkLeft(map: string[][], row: number, column: number): boolean {
  if(map[row][column - 1] !== 'M') {
    return false;
  }
  if(map[row][column - 2] !== 'A') {
    return false;
  }
  if(map[row][column - 3] !== 'S') {
    return false;
  }
  return true;
}

function checkRight(map: string[][], row: number, column: number): boolean {
  if(map[row][column + 1] !== 'M') {
    return false;
  }
  if(map[row][column + 2] !== 'A') {
    return false;
  }
  if(map[row][column + 3] !== 'S') {
    return false;
  }
  return true;
}

function checkTop(map: string[][], row: number, column: number): boolean {
  if(map[row - 1][column] !== 'M') {
    return false;
  }
  if(map[row - 2][column] !== 'A') {
    return false;
  }
  if(map[row - 3][column] !== 'S') {
    return false;
  }
  return true;
}

function checkBottom(map: string[][], row: number, column: number): boolean {
  if(map[row + 1][column] !== 'M') {
    return false;
  }
  if(map[row + 2][column] !== 'A') {
    return false;
  }
  if(map[row + 3][column] !== 'S') {
    return false;
  }
  return true;
}

function checkXMAS(map: string[][], row: number, column: number): number {
  const hasSpaceToLeft = column >= 3;
  const hasSpaceToRight = column < map[row].length - 3;
  const hasSpaceToTop = row >= 3;
  const hasSpaceToBottom = row < map.length - 3;

  let count = 0;
  if(hasSpaceToTop && hasSpaceToLeft && checkTopLeft(map, row, column)) {
    count ++;
  }
  if(hasSpaceToTop && hasSpaceToRight && checkTopRight(map, row, column)) {
    count ++;
  }
  if(hasSpaceToBottom && hasSpaceToLeft && checkBottomLeft(map, row, column)) {
    count ++;
  }
  if(hasSpaceToBottom && hasSpaceToRight && checkBottomRight(map, row, column)) {
    count ++;
  }
  if(hasSpaceToLeft && checkLeft(map, row, column)) {
    count ++;
  }
  if(hasSpaceToRight && checkRight(map, row, column)) {
    count ++;
  }
  if(hasSpaceToTop && checkTop(map, row, column)) {
    count ++;
  }
  if(hasSpaceToBottom && checkBottom(map, row, column)) {
    count ++;
  }
  return count;
}

function countXMAS(map: string[][]): number {
  let count = 0;
  for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'X') {
        count += checkXMAS(map, i, j);
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
