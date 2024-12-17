type Position = {
  x: number;
  y: number;
  direction: Direction;
}

type Direction = {
  dx: number;
  dy: number;
  name: string;
}

type State = {
  position: Position;
  score: number;
  path: Position[];
}

const DIRECTIONS: { [name: string]: Direction } = {
  ['north']: { dx: 0, dy: -1, name: 'north' },
  ['east']: { dx: 1, dy: 0, name: 'east' },
  ['south']: { dx: 0, dy: 1, name: 'south' },
  ['west']: { dx: -1, dy: 0, name: 'west' }
};

// x,y,direction -> score
function hashState(state: State): string {
  return `${state.position.x},${state.position.y},${state.position.direction.name}`;
}

function turnLeft(direction: Direction): Direction {
  switch (direction.name) {
    case 'north':
      return DIRECTIONS['west'];
    case 'east':
      return DIRECTIONS['north'];
    case 'south':
      return DIRECTIONS['east'];
    case 'west':
      return DIRECTIONS['south'];
  }
}

function turnRight(direction: Direction): Direction {
  switch (direction.name) {
    case 'north':
      return DIRECTIONS['east'];
    case 'east':
      return DIRECTIONS['south'];
    case 'south':
      return DIRECTIONS['west'];
    case 'west':
      return DIRECTIONS['north'];
  }
}

function searchEnd(map: string[][], position: Position, end: Position): State {
  const visitedMap: Map<string, number> = new Map();

  const queue: State[] = [];
  queue.push({
    position,
    score: 0,
    path: [position]
  });

  while (queue.length > 0) {
    const minScore = Math.min(...queue.map((state) => state.score));
    const lowestScoreIndex = queue.findIndex(
      (state) => state.score === minScore
    );
    const currentState = queue.splice(lowestScoreIndex, 1)[0];

    if (currentState.position.x === end.x && currentState.position.y === end.y) {
      return currentState;
    }

    const hash = hashState(currentState);
    if (visitedMap.has(hash)) {
      continue;
    }

    visitedMap.set(hash, currentState.score);

    const leftPosition = {
      ...currentState.position,
      direction: turnLeft(currentState.position.direction)
    };
    queue.push({
      position: leftPosition,
      score: currentState.score + 1000,
      path: [...currentState.path, leftPosition]
    });

    const rightPosition = {
      ...currentState.position,
      direction: turnRight(currentState.position.direction)
    };
    queue.push({
      position: rightPosition,
      score: currentState.score + 1000,
      path: [...currentState.path, rightPosition]
    });

    const nextPosition = {
      x: currentState.position.x + currentState.position.direction.dx,
      y: currentState.position.y + currentState.position.direction.dy,
      direction: currentState.position.direction
    };

    if (map[nextPosition.y][nextPosition.x] !== '#') {
      queue.push({
        position: nextPosition,
        score: currentState.score + 1,
        path: [...currentState.path, nextPosition]
      });
    }
  }
}

export function solve(input: string): number {
  const map = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => line.trim().split(''));


  let xReindeer = -1;
  let yReindeer = -1;
  let foundReindeer = false;
  let xEnd = -1;
  let yEnd = -1;
  let foundEnd = false;

  for (let i = 0; (!foundEnd || !foundReindeer) && i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = map[i][j];
      if (cell === 'S') {
        xReindeer = j;
        yReindeer = i;
        foundReindeer = true;
        break;
      } else if (cell === 'E') {
        xEnd = j;
        yEnd = i;
        foundEnd = true;
        break;
      }
    }
  }

  const reindeer: Position = {
    x: xReindeer,
    y: yReindeer,
    direction: DIRECTIONS['east']
  };

  const end: Position = {
    x: xEnd,
    y: yEnd,
    direction: DIRECTIONS['east']
  };

  const endState = searchEnd(map, reindeer, end);

  return endState.score;
}
