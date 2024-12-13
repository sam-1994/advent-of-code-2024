type Field = {
  x: number;
  y: number;
  letter: string;
  grouped: boolean;
}

type Map = Field[][];
type FieldGroup = Field[];

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

function getGroupPerimeter(group: FieldGroup, map: Map): number {
  let perimeter = 0;

  group.forEach((field) => {
    if (field.x === 0 || map[field.y][field.x - 1].letter !== field.letter) {
      perimeter++;
    }
    if (field.y === 0 || map[field.y - 1][field.x].letter !== field.letter) {
      perimeter++;
    }
    if (field.x === map[field.y].length - 1 || map[field.y][field.x + 1].letter !== field.letter) {
      perimeter++;
    }
    if (field.y === map.length - 1 || map[field.y + 1][field.x].letter !== field.letter) {
      perimeter++;
    }
  });

  return perimeter;
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
    (acc, group) => acc + group.length * getGroupPerimeter(group, map),
    0
  );
}
