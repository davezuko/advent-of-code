import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"

const myInput = fs.readFileSync(
    path.resolve(__dirname, "../inputs/day_08.txt"),
    "utf8",
)

const demoInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

const star_1 = (input: string) => {
    const instructions = input.split("\n")
    let pc = 0
    let acc = 0
    const seen = new Set()
    const next = (): [string, number] => {
        const [op, arg] = instructions[pc].split(" ")
        return [op, Number.parseInt(arg)]
    }
    while (true) {
        const [op, arg] = next()
        switch (op) {
            case "nop": {
                pc++
                break
            }
            case "acc": {
                acc += arg
                pc++
                break
            }
            case "jmp": {
                pc += arg
                break
            }
        }
        if (seen.has(pc)) {
            return acc
        } else {
            seen.add(pc)
        }
    }
}

assert.strictEqual(star_1(demoInput), 5)
assert.strictEqual(star_1(myInput), 1600)
