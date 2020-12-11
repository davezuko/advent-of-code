import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"

const myInput = fs.readFileSync(
    path.resolve(__dirname, "../inputs/day_06.txt"),
    "utf8",
)

const demoInput = `abc

a
b
c

ab
ac

a
a
a
a

b`

const star_1 = (input: string) => {
    let sum = 0
    for (const group of input.split("\n\n")) {
        sum += new Set(group.replace(/\n/g, "")).size
    }
    return sum
}

const star_2 = (input: string) => {
    let sum = 0
    for (const group of input.split("\n\n")) {
        const [first, ...rest] = group.split("\n")
        const common = new Set(first.split(""))
        for (const person of rest) {
            for (const answer of common) {
                if (!person.includes(answer)) {
                    common.delete(answer)
                }
            }
        }
        sum += common.size
    }
    return sum
}

assert.strictEqual(star_1(demoInput), 11)
assert.strictEqual(star_1(myInput), 6703)
assert.strictEqual(star_2(demoInput), 6)
assert.strictEqual(star_2(myInput), 3430)
