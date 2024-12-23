function findTriples(connections: Map<string, string[]>): string[] {
  const triples: string[] = [];
  connections.forEach((firstConnections, first) => {
    firstConnections.forEach((second) => {
      const secondConnections = connections.get(second);
      secondConnections.forEach((third) => {
        const thirdConnections = connections.get(third);
        if(thirdConnections.includes(first)) {
          const tripple = [first, second, third].sort().join(',');
          if(!triples.includes(tripple)) {
            triples.push(tripple);
          }
        }
      });
    });
  });
  return triples.sort();
}

export function solve(input: string): number {
  const connections: Map<string, string[]> = new Map();

  input
    .split('\n')
    .filter((line) => line !== '')
    .forEach((line) => {
      const [first, second] = line.split('-');
      if(!connections.has(first)) {
        connections.set(first, []);
      }
      connections.get(first).push(second);
      if(!connections.has(second)) {
        connections.set(second, []);
      }
      connections.get(second).push(first);
    });

  const triples = findTriples(connections);

  return triples.filter((triple) => triple.match(/t[a-z]/)).length;
}
