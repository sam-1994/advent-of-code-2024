function findLan(connections: Map<string, string[]>): string {
  let largestLan = [];
  for(const [node, connected] of connections) {
    const lan = [node];
    for(const connectedNode of connected) {
      if(lan.every((node) => connections.get(connectedNode).includes(node))) {
        lan.push(connectedNode);
      }
    }
    if(lan.length > largestLan.length) {
      largestLan = lan;
    }
  }
  return largestLan.sort().join(',');
}

export function solve(input: string): string {
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

  return findLan(connections);
}
