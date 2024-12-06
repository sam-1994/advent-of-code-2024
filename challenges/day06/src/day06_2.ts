type Field = {
  blocked: boolean;
  visited: {
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
  };
}

type Map = Field[][];

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

type Coordinate = {
  x: number;
  y: number;
}

type Guard = Coordinate & {
  direction: Direction;
  finished?: boolean;
}

function printMap(map: Map, guard: Guard): void {
  console.log(
    map.map((row, y) => {
      return (y + 1).toString().padStart(3, '0') + ' ' + row.map(
        (field, x) => {
          if (x === guard.x && y === guard.y) {
            switch (guard.direction) {
              case Direction.Up:
                return '^';
              case Direction.Right:
                return '>';
              case Direction.Down:
                return 'v';
              case Direction.Left:
                return '<';
            }
          }
          return field.blocked ? '#' : field.visited.up || field.visited.right || field.visited.down || field.visited.left ? 'O' : '.';
        }
      ).join('');
    }).join('\n')
  );
}

function getVisitedPositions(map: Map, startCoordinates: Coordinate): Coordinate[] {
  return map.reduce(
    (coordinates, row, y) => {
      row.forEach((field, x) => {
        if(x === startCoordinates.x && y === startCoordinates.y) {
          return;
        }
        if (field.visited.up || field.visited.right || field.visited.down || field.visited.left) {
          coordinates.push({ x, y });
        }
      });
      return coordinates;
    },
    [] as Coordinate[]
  );
}

function move(map: Map, guard: Guard): void {
  map[guard.y][guard.x].visited[guard.direction] = true;
  switch (guard.direction) {
    case Direction.Up:
      if (guard.y === 0) {
        guard.finished = true;
      } else if (map[guard.y - 1][guard.x].blocked) {
        guard.direction = Direction.Right;
      } else {
        guard.y--;
      }
      break;
    case Direction.Right:
      if (guard.x === map[guard.y].length - 1) {
        guard.finished = true;
      } else if (map[guard.y][guard.x + 1].blocked) {
        guard.direction = Direction.Down;
      } else {
        guard.x++;
      }
      break;
    case Direction.Down:
      if (guard.y === map.length - 1) {
        guard.finished = true;
      } else if (map[guard.y + 1][guard.x].blocked) {
        guard.direction = Direction.Left;
      } else {
        guard.y++;
      }
      break;
    case Direction.Left:
      if (guard.x === 0) {
        guard.finished = true;
      } else if (map[guard.y][guard.x - 1].blocked) {
        guard.direction = Direction.Up;
      } else {
        guard.x--;
      }
      break;
  }
}

function copyMap(map: Map): Map {
  return map.map(
    (row) => row.map(
      (field) => ({
        blocked: field.blocked,
        visited: {
          up: field.visited.up,
          right: field.visited.right,
          down: field.visited.down,
          left: field.visited.left
        }
      })
    )
  );
}

function checkCycleWhenBlocking(_map: Map, _guard: Guard, blockPosition: Coordinate): boolean {
  const map = copyMap(_map);
  map[blockPosition.y][blockPosition.x].blocked = true;
  const guard = {..._guard};

  while (!guard.finished && !map[guard.y][guard.x].visited[guard.direction]) {
    move(map, guard);
  }

  return !guard.finished;
}

export function solve(input: string): number {
  let guard: Guard;

  const map: Map = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line, y) => line
      .trim()
      .split('')
      .map((char, x) => {
        switch (char) {
          case '^':
            guard = { x, y, direction: Direction.Up };
            break;
          case 'v':
            guard = { x, y, direction: Direction.Down };
            break;
          case '<':
            guard = { x, y, direction: Direction.Left };
            break;
          case '>':
            guard = { x, y, direction: Direction.Right };
            break;
        }

        return {
          blocked: char === '#',
          visited: {
            up: false,
            right: false,
            down: false,
            left: false
          }
        };
      })
    );

  const initialMap = copyMap(map);
  const initialGuard = { ...guard };

  while (!guard.finished) {
    move(map, guard);
  }

  const visitedPositions = getVisitedPositions(map, initialGuard);

  const blockForCycle = visitedPositions.filter(
    (field) => checkCycleWhenBlocking(initialMap, initialGuard, field)
  );

  return blockForCycle.length;
}
