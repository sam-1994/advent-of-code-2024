function getOperandValue(registers: Map<string, number>, operand: number): number {
  switch (operand) {
    case 4:
      return registers.get('A');
    case 5:
      return registers.get('B');
    case 6:
      return registers.get('C');
    default:
      return operand;
  }
}

function executeProgramm(registers: Map<string, number>, programm: number[]): string {
  const outputs: string[] = [];

  for (let i = 0; i < programm.length - 1; i += 2) {
    const opcode = programm[i];
    const operand = programm[i + 1];

    const operandValue = getOperandValue(registers, operand);

    switch (opcode) {
      case 0:
        registers.set('A', Math.floor(registers.get('A') / Math.pow(2, operandValue)));
        break;
      case 1:
        registers.set('B', registers.get('B') ^ operandValue);
        break;
      case 2:
        registers.set('B', operandValue % 8);
        break;
      case 3:
        if (registers.get('A') !== 0) {
          i = operandValue - 2;
        }
        break;
      case 4:
        registers.set('B', registers.get('B') ^ registers.get('C'));
        break;
      case 5:
        outputs.push((operandValue % 8).toString());
        break;
      case 6:
        registers.set('B', Math.floor(registers.get('A') / Math.pow(2, operandValue)));
        break;
      case 7:
        registers.set('C', Math.floor(registers.get('A') / Math.pow(2, operandValue)));
        break;
    }
  }

  return outputs.join(',');
}

export function solve(input: string): { output: string, registers: { A: number, B: number, C: number } } {
  const registers: Map<string, number> = new Map();

  const lines = input
    .split('\n')
    .filter((line) => line !== '');

  registers.set('A', Number(lines.shift().split(': ')[1].trim()));
  registers.set('B', Number(lines.shift().split(': ')[1].trim()));
  registers.set('C', Number(lines.shift().split(': ')[1].trim()));

  const programm = lines.shift().split(': ')[1].trim().split(',').map((opcode) => Number(opcode));

  const output = executeProgramm(registers, programm);
  return {
    output,
    registers: {
      A: registers.get('A'),
      B: registers.get('B'),
      C: registers.get('C')
    }
  };
}
