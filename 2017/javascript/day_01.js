const assert = require("assert")
const _ = require("redash")
const fs = require("fs")
const INPUT = fs.readFileSync("../inputs/day_01.txt", "utf8").split("\n")[0]

// Star #1
// -----------------------------------------------
const star_01 = _.pipe([
    _.split(""),
    _.map(parseInt),
    (xs) =>
        xs.filter((n, i) => {
            const next = i === xs.length - 1 ? xs[0] : xs[i + 1]
            return n === next
        }),
    _.sum,
])

assert.equal(star_01(INPUT), 1253)

// Star #2
// -----------------------------------------------
const exercise_02 = _.pipe([
    _.split(""),
    _.map(parseInt),
    (xs) =>
        xs.filter((n, i) => {
            const offset = xs.length / 2
            const overflow = i + offset - xs.length
            const next = xs[overflow >= 0 ? overflow : i + offset]

            return n === next
        }),
    _.sum,
])

assert.equal(exercise_02(INPUT), 1278)
