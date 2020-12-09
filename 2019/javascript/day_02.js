const fs = require("fs")
const path = require("path")
const assert = require("assert")
const file_path = path.resolve(__dirname, "../inputs/day_02.txt")
const input = fs
    .readFileSync(file_path, "utf8")
    .split(",")
    .map((str) => Number.parseInt(str))

function star_01(input) {
    input = [...input]
    input[1] = 12
    input[2] = 2
    return run_program(input)
}

function star_02(input) {
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            let test_input = [...input]
            test_input[1] = i
            test_input[2] = j
            if (run_program(test_input) === 19690720) {
                return i * 100 + j
            }
        }
    }
}

function run_program(input) {
    let pc = 0,
        op
    while ((op = input[pc]) !== 99) {
        const [, arg1, arg2, dest] = input.slice(pc, (pc += 4))
        input[dest] =
            op === 1 ? input[arg1] + input[arg2] : input[arg1] * input[arg2]
    }
    return input[0]
}

assert.equal(star_01(input), 3166704)
assert.equal(star_02(input), 8018)
