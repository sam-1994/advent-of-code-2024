function checkRow(row: number[]): boolean {
  const increasing = row[0] < row[1];

  for(let i=0; i<row.length-1; i++) {
    const diff = row[i+1] - row[i];

    if(increasing && (diff < 1 || 3 < diff )) {
      return false;
    }
    if(!increasing && (diff < -3 || -1 < diff )) {
      return false;
    }
  }

  return true;
}

export function solve(input: string): number {
  return input
    .split('\n')
    .filter((line) => line !== '')
    .map(
      (line) =>  line
        .split(' ')
        .filter((x) => x !== '')
        .map((x) => parseInt(x))
    )
    .filter(
      (row) => checkRow(row)
    )
    .length;
}
