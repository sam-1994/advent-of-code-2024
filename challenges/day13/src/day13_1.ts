type Machine = {
  costA: {
    X: number;
    Y: number;
  }
  costB: {
    X: number;
    Y: number;
  }
  price: {
    X: number;
    Y: number;
  }
}

export function calculateAB(machine: Machine): { a: number; b: number } {
  /*
      a cXa + b cXb = pX
      a cYa + b cYb = pY

      a = (pX - b cXb) / cXa
      a = (pY - b cYb) / cYa

      (pX - b cXb) / cXa = (pY - b cYb) / cYa
      cYa (pX - b cXb) = cXa (pY - b cYb)
      cYa pX - cYa b cXb = cXa pY - cXa b cYb
      cYa pX - cXa pY = cYa b cXb - cXa b cYb
      cYa pX - cXa pY = b (cYa cXb - cXa cYb)
      b = (cYa pX - cXa pY) / (cYa cXb - cXa cYb)
   */
  const b = (machine.costA.Y * machine.price.X - machine.costA.X * machine.price.Y) /
    (machine.costA.Y * machine.costB.X - machine.costA.X * machine.costB.Y);
  const a = (machine.price.X - b * machine.costB.X) / machine.costA.X;

  return {
    a,
    b,
  };
}

export function parseSection(section: string): Machine {
  const lines = section.trim().split('\n');
  const regexCost = /X\+(\d+), Y\+(\d+)/;
  const regexPrice = /X=(\d+), Y=(\d+)/;
  const costA = lines[0].match(regexCost);
  const costB = lines[1].match(regexCost);
  const price = lines[2].match(regexPrice);

  return {
    costA: {
      X: parseInt(costA[1]),
      Y: parseInt(costA[2]),
    },
    costB: {
      X: parseInt(costB[1]),
      Y: parseInt(costB[2]),
    },
    price: {
      X: parseInt(price[1]),
      Y: parseInt(price[2]),
    },
  };
}

export function solve(input: string): number {
  const machines: Machine[] = input
    .split('\n\n')
    .map((section) => parseSection(section));

  return machines
    .map((machine) => calculateAB(machine))
    .filter((counts) => Number.isInteger(counts.a) && Number.isInteger(counts.b))
    .reduce((acc, counts) => acc + counts.a * 3 + counts.b, 0);
}
