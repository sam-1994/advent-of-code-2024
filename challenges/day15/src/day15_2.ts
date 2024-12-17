type Position = {
  x: number;
  y: number;
}

type Direction = {
  dx: number;
  dy: number;
}

const DIRECTIONS: { [name: string]: Direction } = {
  ['^']: { dx: 0, dy: -1 },
  ['>']: { dx: 1, dy: 0 },
  ['v']: { dx: 0, dy: 1 },
  ['<']: { dx: -1, dy: 0 }
};

type DIR = '^' | '>' | 'v' | '<';

function isBlockVerticallyMovable(map: string[][], position: Position, dir: DIR): boolean {
  const direction = DIRECTIONS[dir];
  const checkPosY = position.y + direction.dy;

  switch (map[checkPosY][position.x]) {
    case '#':
      return false;
    case '.':
      return true;
    case '[':
      return isBlockVerticallyMovable(map, {
        x: position.x,
        y: checkPosY
      }, dir) && isBlockVerticallyMovable(map, { x: position.x + 1, y: checkPosY }, dir);
    case ']':
      return isBlockVerticallyMovable(map, {
        x: position.x,
        y: checkPosY
      }, dir) && isBlockVerticallyMovable(map, { x: position.x - 1, y: checkPosY }, dir);
  }
}

function moveBlockVertically(map: string[][], position: Position, dir: DIR): void {
  const direction = DIRECTIONS[dir];
  const nextPosY = position.y + direction.dy;
  const nextLeftPosX = position.x;
  const nextLeftPositionType = map[nextPosY][nextLeftPosX];
  const nextRightPosX = position.x + 1;
  const nextRightPositionType = map[nextPosY][nextRightPosX];

  if (nextLeftPositionType === ']') {
    moveBlockVertically(map, {
      x: nextLeftPosX - 1,
      y: nextPosY
    }, dir);
  }

  if (nextLeftPositionType === '[') {
    moveBlockVertically(map, {
      x: nextLeftPosX,
      y: nextPosY
    }, dir);
  }

  if (nextRightPositionType === '[') {
    moveBlockVertically(map, {
      x: nextRightPosX,
      y: nextPosY
    }, dir);
  }

  map[nextPosY][nextLeftPosX] = '[';
  map[nextPosY][nextRightPosX] = ']';
  map[position.y][position.x] = '.';
  map[position.y][position.x + 1] = '.';
}

function move(map: string[][], robot: Position, dir: DIR): void {
  const direction = DIRECTIONS[dir];

  const nextPosition: Position = {
    x: robot.x + direction.dx,
    y: robot.y + direction.dy
  };

  const nextPositionType = map[nextPosition.y][nextPosition.x];

  if (nextPositionType === '#') {
    return;
  }

  if (nextPositionType === '.') {
    map[robot.y][robot.x] = '.';
    map[nextPosition.y][nextPosition.x] = '@';
  } else if (direction.dy === 0) {
    let checkPosX = nextPosition.x;
    while (map[robot.y][checkPosX] !== '#' && map[robot.y][checkPosX] !== '.') {
      checkPosX += direction.dx;
    }
    if (map[robot.y][checkPosX] === '#') {
      return;
    }
    for (let i = checkPosX; i !== robot.x; i -= direction.dx) {
      map[robot.y][i] = map[robot.y][i - direction.dx];
    }
    map[robot.y][robot.x] = '.';
  } else {

    const blockStartPosition: Position = {
      x: nextPositionType === '[' ? nextPosition.x : nextPosition.x - 1,
      y: nextPosition.y
    };

    if (!isBlockVerticallyMovable(map, blockStartPosition, dir) || !isBlockVerticallyMovable(map, {
      x: blockStartPosition.x + 1,
      y: blockStartPosition.y
    }, dir)) {
      return;
    }

    moveBlockVertically(map, blockStartPosition, dir);
    map[robot.y][robot.x] = '.';
    map[nextPosition.y][nextPosition.x] = '@';
  }

  robot.x = nextPosition.x;
  robot.y = nextPosition.y;
}

function printMap(map: string[][]): void {
  const mapCopy = map.map((line) => [...line]);
  console.log(mapCopy.map((line) => line.join('')).join('\n'));
}

function calculateBoxValues(map: string[][]): number {
  let value = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '[') {

        const blockValue = 100 * y + x;
        value += blockValue;
      }
    }
  }

  return value;
}

export function solve(input: string): number {
  const [mapInput, commandsInput] = input.split('\n\n');

  const map = mapInput.split('\n').map(
    (row) => row
      .trim()
      .split('')
      .map((cell) => {
        if (cell === '@') {
          return '@.';
        } else if (cell === 'O') {
          return '[]';
        } else {
          return cell.repeat(2);
        }
      })
      .join('')
      .split('')
  );

  let x = -1;
  let y = -1;
  let found = false;

  for (let i = 0; !found && i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = map[i][j];
      if (cell === '@') {
        x = j;
        y = i;
        found = true;
        break;
      }
    }
  }

  const commands = commandsInput.replace(/\s+/g, '').split('');
  const robot: Position = {
    x,
    y
  };

  // printMap(map);

  commands.forEach((command) => {
    move(map, robot, command as DIR);
    // console.log('Command:', command);
    // printMap(map);
  });

  printMap(map);

  return calculateBoxValues(map);
}
