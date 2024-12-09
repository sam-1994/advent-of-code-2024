function printBlocks(blocks: string[]): void {
  const output = blocks.reduce((acc, block) => {
    return acc + block.padStart(3, ' ');
  }, '');
  console.log(output);
}

function transformDiskMapToBlocks(map: string): string[] {
  const blocks: string[] = [];

  for (let i = 0; i < map.length; i++) {
    const count = Number(map.charAt(i));
    for (let entryCount = 0; entryCount < count; entryCount++) {
      if (i % 2 === 0) {
        blocks.push((i / 2).toString());
      } else {
        blocks.push('.');
      }
    }
  }

  return blocks;
}


function rearrangeBlocks(blocks: string[]): void {
  for(let i = 0; i<blocks.length; i++) {
    if(blocks[i] !== '.') {
      continue;
    }

    let j = blocks.length - 1;

    while(i < j && blocks[j] === '.') {
      j--;
    }

    if( i === j) {
      continue;
    }

    const entry = blocks[j];
    blocks.splice(j, 1);
    blocks.splice(i, 1, entry);

    // printBlocks(blocks);
  }
}

function calculateChecksum(blocks: string[]): number {
  return blocks.reduce((checksum, block, index) => {
    if(block === '.') {
      return checksum;
    }
    return checksum + Number(block) * index;
  }, 0);
}

export function solve(input: string): number {
  const diskMap = input.trim();
  const blocks = transformDiskMapToBlocks(diskMap);
  // printBlocks(blocks);
  rearrangeBlocks(blocks);
  return calculateChecksum(blocks);
}
