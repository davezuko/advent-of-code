import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";

let input = fs
  .readFileSync(path.resolve(__dirname, "../inputs/day_02.txt"), "utf8")
  .split("\n");

// input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

const star_1 = (input: string[]) => {
  const valid = input.filter((line) => {
    const [, min, max, char, pass] = line.match(/(\d+)-(\d+)\s(\w):\s(\w+)/)!;
    const occurrences = pass.split(char).length - 1;
    return (
      occurrences >= Number.parseInt(min) && occurrences <= Number.parseInt(max)
    );
  });
  return valid.length;
};

const star_2 = (input: string[]) => {
  const valid = input.filter((line) => {
    const [, ia, ib, char, pass] = line.match(/(\d+)-(\d+)\s(\w):\s(\w+)/)!;
    const [a, b] = [
      pass[Number.parseInt(ia) - 1],
      pass[Number.parseInt(ib) - 1],
    ];
    return (a === char || b === char) && a !== b;
  });
  return valid.length;
};

assert.strictEqual(star_1(input), 439);
assert.strictEqual(star_2(input), 584);
