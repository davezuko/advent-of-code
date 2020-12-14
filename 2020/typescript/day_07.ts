import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"

const myInput = fs.readFileSync(
    path.resolve(__dirname, "../inputs/day_07.txt"),
    "utf8",
)

const demoInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

const parse_bags = (input: string) => {
    const bags = {} as any
    for (const line of input.split("\n")) {
        const [bag, rest] = line.split(" bags contain ")
        bags[bag] = []
        for (const b of rest.split(", ")) {
            if (b === "no other bags.") break
            const [_, count, type] = b.match(/(\d+)\s([\w\s]+)/)!
            bags[bag].push({
                count: Number.parseInt(count),
                type: type.replace(/bags?/g, "").trim(),
            })
        }
    }
    return bags
}

const star_1 = (input: string) => {
    const bags = parse_bags(input)
    let sum = 0

    for (const type of Object.keys(bags)) {
        if (type === "shiny gold") continue

        const types = new Set()
        function recur(type) {
            if (types.has(type)) return
            types.add(type)
            bags[type].forEach((bag) => {
                if (bag.count) {
                    recur(bag.type)
                }
            })
        }
        recur(type)
        if (types.has("shiny gold")) {
            sum++
        }
    }
    return sum
}

assert.strictEqual(star_1(demoInput), 4)
assert.strictEqual(star_1(myInput), 179)
