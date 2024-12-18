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

    const comboOperandValue = getOperandValue(registers, operand);

    switch (opcode) {
      case 0:
        registers.set('A', Math.floor(registers.get('A') / Math.pow(2, comboOperandValue)));
        break;
      case 1:
        registers.set('B', Number(BigInt(registers.get('B')) ^ BigInt(operand)));
        break;
      case 2:
        registers.set('B', comboOperandValue % 8);
        break;
      case 3:
        if (registers.get('A') !== 0) {
          i = operand - 2;
        }
        break;
      case 4:
        registers.set('B', registers.get('B') ^ registers.get('C'));
        break;
      case 5:
        outputs.push((comboOperandValue % 8).toString());
        break;
      case 6:
        registers.set('B', Math.floor(registers.get('A') / Math.pow(2, comboOperandValue)));
        break;
      case 7:
        registers.set('C', Math.floor(registers.get('A') / Math.pow(2, comboOperandValue)));
        break;
    }
  }

  return outputs.join(',');
}

export function solve(input: string): number {
  const registers: Map<string, number> = new Map();

  const lines = input
    .split('\n')
    .filter((line) => line !== '');

  const A = Number(lines.shift().split(': ')[1].trim());
  const B = Number(lines.shift().split(': ')[1].trim());
  const C = Number(lines.shift().split(': ')[1].trim());
  registers.set('A', A);
  registers.set('B', B);
  registers.set('C', C);

  const programmString = lines.shift().split(': ')[1].trim();
  const programm = programmString.split(',').map((opcode) => Number(opcode));

  let a = -1;
  let output: string;

  do {
    a++;
    registers.set('A', a);
    output = executeProgramm(registers, programm);
  } while(output !== programmString)

  return a;
}
