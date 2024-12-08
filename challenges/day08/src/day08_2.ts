import { gcd } from '@scs-aoc/utils';

type Coordinates = {
  x: number,
  y: number,
}

function filterDouplicatedCoordinates(coordinates: Coordinates[]): Coordinates[] {
  const filteredCoordinates: Coordinates[] = [];
  coordinates.forEach(
    (coordinate) => {
      const isExisting = filteredCoordinates.some(
        (existingCoordinate) => existingCoordinate.x === coordinate.x && existingCoordinate.y === coordinate.y
      );
      if (!isExisting) {
        filteredCoordinates.push(coordinate);
      }
    });
  return filteredCoordinates;
}

function sortCoordinates(coordinates: Coordinates[]): Coordinates[] {
  return coordinates.sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });
}

function getAntinodesOfAntennas(antennas: Coordinates[], maxX, maxY): Coordinates[] {
  const antinodes: Coordinates[] = [];
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i+1; j < antennas.length; j++) {
      const antenna1 = antennas[i];
      const antenna2 = antennas[j];

      const distanceX = antenna2.x - antenna1.x;
      const distanceY = antenna2.y - antenna1.y;
      const distanceGcd = gcd(distanceX, distanceY);

      const stepX = distanceX / distanceGcd;
      const stepY = distanceY / distanceGcd;

      let antinodeX = antenna2.x;
      let antinodeY = antenna2.y;

      while (0 <= antinodeX && antinodeX <= maxX && 0 <= antinodeY && antinodeY <= maxY) {
        antinodes.push({ x: antinodeX, y: antinodeY });
        antinodeX += stepX;
        antinodeY += stepY;
      }

      antinodeX = antenna2.x;
      antinodeY = antenna2.y;

      while (0 <= antinodeX && antinodeX <= maxX && 0 <= antinodeY && antinodeY <= maxY) {
        antinodes.push({ x: antinodeX, y: antinodeY });
        antinodeX -= stepX;
        antinodeY -= stepY;
      }
    }
  }
  return filterDouplicatedCoordinates(antinodes);
}

export function solve(input: string): number {
  const antennaMap: Map<string, Coordinates[]> = new Map();

  const lines = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => line.trim());

  const maxX = lines[0].length - 1;
  const maxY = lines.length - 1;

  lines.forEach((line, indexY) => {
    line.split('').forEach((char, indexX) => {
      if (char.match(/[a-zA-Z0-9]/)) {
        const coordinates: Coordinates = {
          x: indexX,
          y: indexY
        };
        if (antennaMap.has(char)) {
          antennaMap.get(char).push(coordinates);
        } else {
          antennaMap.set(char, [coordinates]);
        }
      }
    });
  });

  let antinodes: Coordinates[] = [];

  for (const antennas of antennaMap.values()) {
    const frequencyAntinodes = getAntinodesOfAntennas(antennas, maxX, maxY);
    antinodes = filterDouplicatedCoordinates([...antinodes, ...frequencyAntinodes]);
  }

  antinodes = sortCoordinates(antinodes);

  return antinodes.length;
}
