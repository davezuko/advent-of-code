import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";

let input = fs
  .readFileSync(path.resolve(__dirname, "../inputs/day_01.txt"), "utf8")
  .split("\n")
  .map((n) => Number.parseInt(n))
  .sort((a, b) => a - b);

// input = [1721, 979, 366, 299, 675, 1456];

const star_1 = (input: number[]) => {
  for (let i = 0; i < input.length; i++) {
    const expect = 2020 - input[i];
    for (let j = i + 1; j < input.length; j++) {
      if (input[j] === expect) {
        return input[i] * input[j];
      }
    }
  }
};

const star_2 = (input: number[]) => {
  for (let i = 0; i < input.length; i++) {
    const a = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const b = input[j];
      for (let y = j + 1; y < input.length; y++) {
        const c = input[y];
        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }
};

assert.strictEqual(star_1(input), 719796);
assert.strictEqual(star_2(input), 144554112);
