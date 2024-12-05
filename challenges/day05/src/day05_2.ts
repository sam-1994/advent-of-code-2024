function getMiddlePage(pages: number[]): number {
  return pages[Math.floor(pages.length / 2)];
}



function orderPagesShuffle(pages: number[], dependencyMap: Map<number, number[]>): number[] {
  let orderedPages: number[] = [];
  let unorderedPages: number[] = [...pages];

  console.log(unorderedPages);

  do {
    orderedPages = [];
    unorderedPages = [...pages];

    while (unorderedPages.length > 0) {
      orderedPages.push(
        ...unorderedPages.splice(Math.floor(Math.random() * unorderedPages.length), 1)
      );
    }
  } while (!checkPages(orderedPages, dependencyMap));

  console.log(orderedPages);

  return orderedPages;
}

function orderPages(pages: number[], dependencyMap: Map<number, number[]>): number[] {
  const orderedPages: number[] = [];
  const unorderedPages: number[] = [...pages];

  while (unorderedPages.length > 0) {
    const page = unorderedPages.shift() || 0;

    if (dependencyMap.has(page)) {
      const dependencies = dependencyMap.get(page);

      dependencies.forEach((dependency) => {
        const index = orderedPages.indexOf(dependency);
         if(index >= 0) {
           unorderedPages.push(...orderedPages.splice(index, 1));
         }
      });
    }

    orderedPages.push(page);
  }

  return orderedPages;
}

function checkPages(pageList: number[], dependencyMap: Map<number, number[]>): boolean {
  const previousPages: number[] = [];

  for (let i = 0; i < pageList.length; i++) {
    const page = pageList[i];

    if (dependencyMap.has(page)) {
      const dependencies = dependencyMap.get(page) || [];

      for (const dependency of dependencies) {
        if (previousPages.indexOf(dependency) >= 0) {
          return false;
        }
      }
    }

    previousPages.push(page);
  }

  return true;
}

export function solve(input: string): number {
  const dependencyMap: Map<number, number[]> = new Map();
  const pageLists: number[][] = [];

  const lines = input
    .split('\n')
    .map((line) => line.trim());

  while (lines[0].length > 0) {
    const [first, second] = lines.shift().split('|').map(Number);
    if (dependencyMap.has(first)) {
      dependencyMap.get(first).push(second);
    } else {
      dependencyMap.set(first, [second]);
    }
  }

  lines.shift(); // Skip empty line

  while (lines[0].length > 0) {
    pageLists.push(lines.shift().split(',').map(Number));
  }


  return pageLists
    .filter((pageList) => !checkPages(pageList, dependencyMap))
    .map((pageList) => orderPages(pageList, dependencyMap))
    .reduce((acc, pageList) => {
      const middlePage = getMiddlePage(pageList);
      return acc + middlePage;
    }, 0);
}
