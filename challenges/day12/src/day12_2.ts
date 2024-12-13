type Field = {
  x: number;
  y: number;
  letter: string;
  grouped: boolean;
  visitedWall?: {
    north: boolean;
    east: boolean;
    south: boolean;
    west: boolean;
  }
}

type Map = Field[][];
type FieldGroup = Field[];

type Direction = {
  x: number;
  y: number;
  name: string;
}

const DIRECTIONS: {[name: string]: Direction} = {
  NORTH: { x: 0, y: -1, name: 'north' },
  EAST: { x: 1, y: 0, name: 'east' },
  SOUTH: { x: 0, y: 1, name: 'south' },
  WEST: { x: -1, y: 0, name: 'west' },
}

function turnLeft(direction: Direction): Direction {
  switch (direction) {
    case DIRECTIONS.NORTH:
      return DIRECTIONS.WEST;
    case DIRECTIONS.EAST:
      return DIRECTIONS.NORTH;
    case DIRECTIONS.SOUTH:
      return DIRECTIONS.EAST;
    case DIRECTIONS.WEST:
      return DIRECTIONS.SOUTH;
  }
}

function turnRight(direction: Direction): Direction {
  switch (direction) {
    case DIRECTIONS.NORTH:
      return DIRECTIONS.EAST;
    case DIRECTIONS.EAST:
      return DIRECTIONS.SOUTH;
    case DIRECTIONS.SOUTH:
      return DIRECTIONS.WEST;
    case DIRECTIONS.WEST:
      return DIRECTIONS.NORTH;
  }
}

function getNextField(map: Map, field: Field, direction: Direction): Field | null {
  const nextX = field.x + direction.x;
  const nextY = field.y + direction.y;

  if (nextX < 0 || nextX >= map[field.y].length || nextY < 0 || nextY >= map.length) {
    return null;
  }

  return map[nextY][nextX];
}

function collectGroup(map: Map, group: FieldGroup, letter: string, x: number, y: number): void {
  const field = map[y][x];

  if (field.grouped || field.letter !== letter) {
    return;
  }

  group.push(field);
  field.grouped = true;

  if (x > 0) {
    collectGroup(map, group, letter, x - 1, y);
  }

  if (y > 0) {
    collectGroup(map, group, letter, x, y - 1);
  }

  if (x < map[0].length - 1) {
    collectGroup(map, group, letter, x + 1, y);
  }

  if (y < map.length - 1) {
    collectGroup(map, group, letter, x, y + 1);
  }
}

function splitMapIntoGroups(map: Map): FieldGroup[] {
  const groups: FieldGroup[] = [];

  map.forEach((row) => {
    row.forEach((field) => {
      if (field.grouped) {
        return;
      }

      const group: FieldGroup = [];
      collectGroup(map, group, field.letter, field.x, field.y);
      groups.push(group);
    });
  });

  return groups;
}

function countSides(group: FieldGroup, map: Map, initialField: Field, initialDirection: Direction, leftHanded: boolean): number {
  let sides = 0;
  let currentField = initialField;
  let direction = initialDirection;

  do {
    const sideDirection = leftHanded ? turnLeft(direction) : turnRight(direction);
    const sideField = getNextField(map, currentField, sideDirection);
    if(sideField && group.includes(sideField)) {
      currentField = sideField;
      sides++;
      direction = sideDirection;
      continue;
    }

    currentField.visitedWall[sideDirection.name] = true;

    const forwardField = getNextField(map, currentField, direction);
    if(group.includes(forwardField)) {
      currentField = forwardField;
      continue;
    }

    direction = leftHanded ? turnRight(direction) : turnLeft(direction);
    sides++;
  } while (currentField.x !== initialField.x || currentField.y !== initialField.y || direction.name !== initialDirection.name);

  return sides;
}

function getGroupSideNumber(group: FieldGroup, map: Map): number {
  group.forEach((field) => {
    field.visitedWall = {
      north: group.includes(getNextField(map, field, DIRECTIONS.NORTH)),
      east: group.includes(getNextField(map, field, DIRECTIONS.EAST)),
      south: group.includes(getNextField(map, field, DIRECTIONS.SOUTH)),
      west: group.includes(getNextField(map, field, DIRECTIONS.WEST)),
    }
  });

  const startY = Math.min(...group.map((field) => field.y));
  const startX = map[startY].findIndex((field) => group.includes(field));

  let sides = 0;
  let currentField = map[startY][startX];
  let direction = DIRECTIONS.EAST;

  sides += countSides(group, map, currentField, direction, true);


  while(group.some(
    (field) => !field.visitedWall.north || !field.visitedWall.east || !field.visitedWall.south || !field.visitedWall.west
  )) {
    currentField = group.find(
      (field) => !field.visitedWall.north || !field.visitedWall.east || !field.visitedWall.south || !field.visitedWall.west
    );
    direction =
      !currentField.visitedWall.north ? DIRECTIONS.WEST :
      !currentField.visitedWall.east ? DIRECTIONS.NORTH :
      !currentField.visitedWall.south ? DIRECTIONS.EAST :
      DIRECTIONS.SOUTH;

    sides += countSides(group, map, currentField, direction, false);
  }

  return sides;
}

export function solve(input: string): number {
  const map: Map = input
    .split('\n')
    .filter((line) => line !== '')
    .map(
      (line, y) => line
        .trim()
        .split('')
        .map((letter, x) => ({ letter, grouped: false, x, y }))
    );

  const groups = splitMapIntoGroups(map);

  return groups.reduce(
    (acc, group) => {
      const sides = getGroupSideNumber(group, map);
      return acc + group.length * sides;
    },
    0
  );
}
