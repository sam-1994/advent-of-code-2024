export function solve(input: string): number {
  const locks: number[][] = [];
  const keys: number[][] = [];

  input
    .split('\n\n')
    .forEach((group) => {
      const map = group
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line) => line.trim().split(''));

      if (map[0][0] === '#') {
        const lock: number[] = [];
        for (let column = 0; column < map[0].length; column++) {
          let count = 0;
          for (let row = 1; row < map.length; row++) {
            if (map[row][column] === '#') {
              count++;
            }
          }
          lock.push(count);
        }
        locks.push(lock);
      } else {
        const key: number[] = [];
        for (let column = 0; column < map[0].length; column++) {
          let count = 0;
          for (let row =  map.length - 2; row > 0; row--) {
            if (map[row][column] === '#') {
              count++;
            }
          }
          key.push(count);
        }
        keys.push(key);
      }
    });

  let matches = 0;
  keys.forEach((key) => {
    locks.forEach((lock) => {
      let fits = true;
      for(let i=0; i<lock.length; i++) {
        if (lock[i] + key[i] > 5) {
          fits = false;
        }
      }
      if(fits) {
        matches++;
      }
    });
  });

  return matches;
}
