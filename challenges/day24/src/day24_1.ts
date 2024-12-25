enum Operator {
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
}

type Initialization = {
  variable: string;
  value: boolean;
}

type Instruction = {
  variable1: string;
  variable2: string;
  operator: Operator;
  result: string;
}

function initializeVariables(initialValues: Initialization[]): Map<string, boolean> {
  const variables: Map<string, boolean> = new Map();
  initialValues.forEach(({ variable, value }) => {
    variables.set(variable, value);
  });
  return variables;
}

function executeInstructions(instructions: Instruction[], variables: Map<string, boolean>): void {
  while(instructions.length > 0) {
    const instruction = instructions.shift();
    if (!instruction) {
      break;
    }

    const variable1Value = variables.get(instruction.variable1);
    const variable2Value = variables.get(instruction.variable2);

    if (variable1Value === undefined || variable2Value === undefined) {
      instructions.push(instruction);
      continue;
    }

    let result: boolean;
    switch (instruction.operator) {
      case Operator.AND:
        result = variable1Value && variable2Value;
        break;
      case Operator.OR:
        result = variable1Value || variable2Value;
        break;
      case Operator.XOR:
        result = variable1Value !== variable2Value;
        break;
    }

    variables.set(instruction.result, result);
  }
}

function calculateOutput(variables: Map<string, boolean>): number {
  return Array.from(variables.keys())
    .filter((variable) => variable.startsWith('z'))
    .sort()
    .reduce((acc, variable, index) => {
      const value = variables.get(variable);
      if (!value) {
        return acc;
      }
      return acc + Math.pow(2, index);
    }, 0);
}

export function solve(input: string): number {
  const inputSections = input
    .split('\n\n');

  const initialValues: Initialization[] = inputSections[0]
    .split('\n')
    .map((line) => {
      const lineParts = line.split(': ');
      return {
        variable: lineParts[0].trim(),
        value: lineParts[1].trim() === '1',
      }
    });

  const instructions: Instruction[] = inputSections[1]
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      const regex = /^(\w+)\s+(\w+)\s+(\w+)\s+->\s+(\w+)$/;
      const matches = line.match(regex);
      return {
        variable1: matches[1],
        operator: matches[2] as Operator,
        variable2: matches[3],
        result: matches[4],
      }
    });

  const variables = initializeVariables(initialValues);
  executeInstructions(instructions, variables);
  return calculateOutput(variables);
}
