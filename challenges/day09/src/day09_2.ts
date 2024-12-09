type Block = {
  value: string;
  size: number;
  moved?: boolean;
}

function printBlocks(blocks: Block[]): void {
  const output = blocks.reduce((acc, block) => {
    return acc + block.value.padStart(3, ' ').repeat(block.size);
  }, '');
  console.log(output);
}

function transformDiskMapToBlocks(map: string): Block[] {
  const blocks: Block[] = [];

  for (let i = 0; i < map.length; i++) {
    const size = Number(map.charAt(i));
      if (i % 2 === 0) {
        blocks.push({
          value: i/2 + '',
          size,
        });
      } else {
        blocks.push({
          value: '.',
          size,
        });
      }
  }

  return blocks;
}


function rearrangeBlocks(blocks: Block[]): void {
  for(let i = blocks.length - 1; i > 0; i--) {
    if(blocks[i].value === '.' || blocks[i].moved) {
      continue;
    }


    let j = 0;

    while(j < i && (blocks[j].value !== '.' || blocks[j].size < blocks[i].size)) {
      j++;
    }

    if( i === j) {
      continue;
    }

    const entry = blocks[i];
    const space = blocks[j];
    blocks.splice(i, 1, {
      value: '.',
      size: entry.size,
    });
    if(entry.size === space.size) {
      blocks.splice(j, 1);
    } else {
      space.size -= entry.size;
    }
    blocks.splice(j, 0, entry);
    entry.moved = true;

    // printBlocks(blocks);
  }
}

function calculateChecksum(blocks: Block[]): number {
  let checksum = 0;
  let position = 0;

  for(let i=0 , j=0; i<blocks.length; i++) {
    if(blocks[i].value !== '.') {
      for (let j = position; j < position + blocks[i].size; j++) {
        checksum += Number(blocks[i].value) * (j);
      }
    }
    position += blocks[i].size;
  }

  return checksum;
}

export function solve(input: string): number {
  const diskMap = input.trim();
  const blocks = transformDiskMapToBlocks(diskMap);
  // console.log(blocks);
  // printBlocks(blocks);
  rearrangeBlocks(blocks);
  return calculateChecksum(blocks);
}
