enum Operator {
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
}

type Instruction = {
  variables: string[];
  operator: Operator;
  result: string;
}

type Node = {
  variable: string;
  edgeIn: Edge;
  edgesOut: Edge[];
}

type Edge = {
  operator: Operator;
  nodesIn: Node[];
  nodeOut: Node;
}

function createGraph(instructions: Instruction[]): Map<string, Node> {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  instructions.forEach((instruction) => {
    const nodeOut = nodes.find((node) => node.variable === instruction.result) || {
      variable: instruction.result,
      edgeIn: null,
      edgesOut: []
    };

    const nodeIn1 = nodes.find((node) => node.variable === instruction.variables[0]) || {
      variable: instruction.variables[0],
      edgeIn: null,
      edgesOut: []
    };

    const nodeIn2 = nodes.find((node) => node.variable === instruction.variables[1]) || {
      variable: instruction.variables[1],
      edgeIn: null,
      edgesOut: []
    };

    const edge: Edge = {
      operator: instruction.operator,
      nodesIn: [nodeIn1, nodeIn2],
      nodeOut
    };

    nodeOut.edgeIn = edge;
    nodeIn1.edgesOut.push(edge);
    nodeIn2.edgesOut.push(edge);

    nodes.push(nodeOut, nodeIn1, nodeIn2);
    edges.push(edge);
  });

  const nodeMap = new Map<string, Node>();
  nodes.forEach((node) => {
    nodeMap.set(node.variable, node);
  });

  return nodeMap;
}

function getWrongOutputs(
  nodeMap: Map<string, Node>,
): string[] {
  const wrongOutputs: string[] = [];

  let transfer: Node = null;
  let iteration = 0;

  while (true) {
    const xNode = nodeMap.get('x'+iteration.toString().padStart(2, '0'));
    const yNode = nodeMap.get('y'+iteration.toString().padStart(2, '0'));
    const zNode = nodeMap.get('z'+iteration.toString().padStart(2, '0'));

    if(!xNode || !yNode || !zNode) {
      break;
    }

    if(!transfer) {
      const xorOutput = xNode.edgesOut.find((edge) => edge.operator === Operator.XOR).nodeOut;
      if(xorOutput.variable !== zNode.variable) {
        wrongOutputs.push(zNode.variable);
      }
      transfer = xNode.edgesOut.find((edge) => edge.operator === Operator.AND).nodeOut;
    } else {
      if(transfer.edgesOut.length !== 2) {
        wrongOutputs.push(transfer.variable);
      }
      const andOutput = xNode.edgesOut.find((edge) => edge.operator === Operator.AND).nodeOut;
      if(andOutput.edgesOut.length !== 1) {
        wrongOutputs.push(andOutput.variable);
      }
      const xorOutput = xNode.edgesOut.find((edge) => edge.operator === Operator.XOR).nodeOut;
      if(xorOutput.edgesOut.length !== 2) {
        wrongOutputs.push(xorOutput.variable);
      }
      if(zNode.edgeIn.operator !== Operator.XOR) {
        wrongOutputs.push(zNode.variable);
      }

      let orEdge = andOutput.edgeIn;
      while(orEdge && orEdge.operator !== Operator.OR) {
        orEdge = orEdge.nodeOut.edgesOut.find((edge) => edge.nodeOut.edgesOut.length > 0);
      }

      transfer = orEdge?.nodeOut;
    }

    iteration++;
  }

  return wrongOutputs;
}

export function solve(input: string): string {

  const instructions: Instruction[] = input
    .split('\n\n')[1]
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      const regex = /^(\w+)\s+(\w+)\s+(\w+)\s+->\s+(\w+)$/;
      const matches = line.match(regex);
      return {
        variables: [matches[1], matches[3]],
        operator: matches[2] as Operator,
        result: matches[4]
      };
    });

  const nodeMap = createGraph(instructions);

  const wrongOutputs = getWrongOutputs(nodeMap);

  return wrongOutputs.sort().join(',');
}


// 000    011    100   101
// 000    001    011   001
// ---    ---    ---   ---
// 000    100    111   110

// z0 = x0 ^ y0
// t0 = x0 & y0
// z1 = x1 ^ y1 ^ t0
// t1 = x1 & y1 ^ x1 & t0 ^ y1 & t0 = (x1 & y1) | ((x1 ^ y1) & t0)
// z2 = x2 ^ y2 ^ t1
