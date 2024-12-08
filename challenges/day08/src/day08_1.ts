type Coordinates = {
  x: number,
  y: number,
}

function getAntinodesOfAntennas(antennas: Coordinates[], maxX, maxY): Coordinates[] {
  const antinodes: Coordinates[] = []
  for(let i=0; i<antennas.length; i++) {
    const antenna1 = antennas[i];
    for(let j = 0; j < antennas.length; j++) {
      if(i === j) {
        continue;
      }
      const antenna2 = antennas[j];

      const antinodeX = 2* antenna2.x - antenna1.x;
      const antinodeY = 2* antenna2.y - antenna1.y;

      if(0 <= antinodeX && antinodeX <= maxX && 0 <= antinodeY && antinodeY <= maxY) {
        antinodes.push({x: antinodeX, y: antinodeY});
      }
    }
  }
  return antinodes;
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

  const antinodes: Coordinates[] = [];

  for (const antennas of antennaMap.values()) {
    const frequencyAntinodes = getAntinodesOfAntennas(antennas, maxX, maxY);
    const newAntinodes = frequencyAntinodes.filter(
      (antinode) => !antinodes.some(
        (existingAntinode) => antinode.x === existingAntinode.x && antinode.y === existingAntinode.y
      )
    );
    antinodes.push(...newAntinodes);
  }

  return antinodes.length;
}
