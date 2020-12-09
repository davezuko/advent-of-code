const assert = require("assert")
const _ = require("redash")
const fs = require("fs")
const INPUT = fs
    .readFileSync("../inputs/day_04.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .join("\n")

// Star #1
// -----------------------------------------------
const isValidPassphrase = (phrase) =>
    new Set(phrase.split(" ")).size === phrase.split(" ").length
const star_01 = _.pipe([_.split("\n"), _.filter(isValidPassphrase), _.length])

assert.equal(star_01("aa bb cc dd ee"), 1)
assert.equal(star_01("aa bb cc dd aa"), 0)
assert.equal(star_01("aa bb cc dd aaa"), 1)
assert.equal(
    star_01(["aa bb cc dd ee", "aa bb cc dd aa", "aa bb cc dd aaa"].join("\n")),
    2,
)
assert.equal(star_01(INPUT), 386)

// Star #2
// -----------------------------------------------
const isValidPassphrase_ = (phrase) => {
    const words = phrase.split(" ")
    return (
        new Set(_.map((w) => [...w].sort().join(""), words)).size ===
        words.length
    )
}

const exercise_02 = _.pipe([
    _.split("\n"),
    _.filter(isValidPassphrase_),
    _.length,
])

assert.equal(exercise_02("abcde fghij"), 1)
assert.equal(exercise_02("abcde xyz ecdab"), 0)
assert.equal(exercise_02("a ab abc abd abf abj"), 1)
assert.equal(exercise_02("iiii oiii ooii oooi oooo"), 1)
assert.equal(exercise_02("oiii ioii iioi iiio"), 0)
assert.equal(exercise_02(INPUT), 208)
