type Field = {
  blocked: boolean;
  visited: boolean;
}

type Map = Field[][];

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

type Guard = {
  x: number;
  y: number;
  direction: Direction;
  finished?: boolean;
}

function countVisited(map: Map): number {
  return map.reduce(
    (acc, row) => acc + row.filter(
      (field) => field.visited
    ).length,
    0
  );
}

function move(map: Map, guard: Guard, direction: Direction): void {
  map[guard.y][guard.x].visited = true;
  switch (direction) {
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

export function solve(input: string): number {
  let guard: Guard;

  const map = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line, y) => line
      .trim()
      .split('')
      .map<Field>((char, x) => {
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
          visited: false
        };
      })
    );

  while (!guard.finished) {
    move(map, guard, guard.direction);
  }

  return countVisited(map);
}
