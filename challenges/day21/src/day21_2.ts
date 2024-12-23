type Position = {
  x: number,
  y: number,
}

const numericMap: Map<string, Position> = new Map();
numericMap.set(' ', { x: 0, y: 0 });
numericMap.set('0', { x: 1, y: 0 });
numericMap.set('A', { x: 2, y: 0 });
numericMap.set('1', { x: 0, y: 1 });
numericMap.set('2', { x: 1, y: 1 });
numericMap.set('3', { x: 2, y: 1 });
numericMap.set('4', { x: 0, y: 2 });
numericMap.set('5', { x: 1, y: 2 });
numericMap.set('6', { x: 2, y: 2 });
numericMap.set('7', { x: 0, y: 3 });
numericMap.set('8', { x: 1, y: 3 });
numericMap.set('9', { x: 2, y: 3 });

const directionalMap: Map<string, Position> = new Map();
directionalMap.set(' ', { x: 0, y: 1 });
directionalMap.set('^', { x: 1, y: 1 });
directionalMap.set('A', { x: 2, y: 1 });
directionalMap.set('<', { x: 0, y: 0 });
directionalMap.set('v', { x: 1, y: 0 });
directionalMap.set('>', { x: 2, y: 0 });

const cache = new Map<string, number>();

function transformCode(
  code: string,
  charMap: Map<string, Position>
): string[] {
  const emptyPosition = charMap.get(' ');

  let combinations: string[] = [''];
  let lastChar = 'A';

  for (const nextChar of code) {
    const keyCombinations = [];

    const lastPosition = charMap.get(lastChar);
    const nextPosition = charMap.get(nextChar);

    const diffY = nextPosition.y - lastPosition.y;
    const diffYEmpty = emptyPosition.y - lastPosition.y;

    const diffX = nextPosition.x - lastPosition.x;
    const diffXEmpty = emptyPosition.x - lastPosition.x;

    if (diffY !== 0 && (diffYEmpty !== diffY || diffXEmpty !== 0)) {
      const combination = (diffY > 0 ? '^' : 'v').repeat(Math.abs(diffY)) + (diffX > 0 ? '>' : '<').repeat(Math.abs(diffX)) + 'A';
      keyCombinations.push(combination);
    }
    if (diffX !== 0 && (diffXEmpty !== diffX || diffYEmpty !== 0)) {
      const combination = (diffX > 0 ? '>' : '<').repeat(Math.abs(diffX)) + (diffY > 0 ? '^' : 'v').repeat(Math.abs(diffY)) + 'A';
      keyCombinations.push(combination);
    }
    if (diffX === 0 && diffY === 0) {
      keyCombinations.push('A');
    }

    combinations = combinations.reduce((acc: string[], combination) => {
      keyCombinations.forEach((key) => {
        acc.push(combination + key);
      });
      return acc;
    }, []);

    lastChar = nextChar;
  }


  return combinations;
}

export function getTransformationCosts(
  code: string,
  charMap: Map<string, Position>,
  iterations: number
): number {
  const hash = `${iterations}-${code}`;
  if (cache.has(hash)) {
    return cache.get(hash);
  }
  const transformations = transformCode(code, charMap);

  const costs = Math.min(...transformations.map((transformation) => {
    if (iterations === 0) {
      return transformation.length;
    } else {
      const codeParts = transformation.replace(/A/g, 'A ').split(' ');
      return codeParts.reduce(
        (acc, codePart) => acc + getTransformationCosts(codePart, charMap, iterations - 1),
        0
      );
    }
  }));

  cache.set(hash, costs);
  return costs;

}

export function solve(input: string, robotCount: number): number {
  const codes = input
    .split('\n')
    .filter((line) => line !== '');

  return codes.reduce((acc, code) => {
    const codeNumber = Number(code.substring(0, code.length - 1));

    const transformations = transformCode(code, numericMap);
    const transformationCosts = transformations.map(
      (transformation) => getTransformationCosts(transformation, directionalMap, robotCount-1 )
    );

    return acc + codeNumber * Math.min(...transformationCosts);
  }, 0);
}

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
// |   | 0 | A |
// +---+---+---+

// +---+---+---+
// |   | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

