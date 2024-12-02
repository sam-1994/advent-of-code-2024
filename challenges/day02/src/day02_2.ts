function checkRow(row: number[], retry = true): boolean {
  let increasingCount = 0
  for(let i=0; i<row.length-1; i++) {
    const diff = row[i+1] - row[i];
    increasingCount += diff > 0 ? 1 : 0;
  }

  if(1 < increasingCount && increasingCount < row.length - 2) {
    return false;
  }

  const increasing = row.length - 2 <= increasingCount;

  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i + 1] - row[i];
    let pass = true;

    if (increasing && (diff < 1 || 3 < diff)) {
      pass = false;
    }
    if (!increasing && (diff < -3 || -1 < diff)) {
      pass = false;
    }

    if (!pass) {
      if (!retry) {
        return false;
      }

      if( i === 0 && checkRow(row.slice(1), false)) {
        return true;
      }

      row.splice(i + 1, 1);
      return checkRow(row, false);
    }
  }

  return true;
}

export function solve(input: string): number {
  return input
    .split('\n')
    .filter((line) => line !== '')
    .map(
      (line) => line
        .split(' ')
        .filter((x) => x !== '')
        .map((x) => parseInt(x))
    )
    .filter(
      (row) => checkRow(row)
    )
    .length;
}
