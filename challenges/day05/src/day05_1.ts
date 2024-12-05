function getMiddlePage(pages: number[]): number {
  return pages[Math.floor(pages.length / 2)];
}

function checkPages(pageList: number[], dependencyMap: Map<number, number[]>): boolean {
  const previousPages: number[] = [];

  for(let i=0; i<pageList.length; i++) {
    const page = pageList[i];

    if(dependencyMap.has(page)) {
      const dependencies = dependencyMap.get(page) || [];

      for(const dependency of dependencies) {
        if(previousPages.indexOf(dependency) >= 0) {
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

  while(lines[0].length > 0) {
    const [first, second] = lines.shift().split('|').map(Number);
    if(dependencyMap.has(first)) {
      dependencyMap.get(first).push(second);
    } else {
      dependencyMap.set(first, [second]);
    }
  }

  lines.shift(); // Skip empty line

  while(lines[0].length > 0) {
    pageLists.push(lines.shift().split(',').map(Number));
  }


  return pageLists
    .filter((pageList) => checkPages(pageList, dependencyMap))
    .reduce((acc, pageList) => {
      const middlePage = getMiddlePage(pageList);
      return acc + middlePage;
    }, 0);
}
