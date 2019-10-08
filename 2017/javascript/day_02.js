const assert = require('assert')
const _ = require('redash')
const fs = require('fs')
const INPUT = fs.readFileSync('../inputs/day_02.txt', 'utf8')

/** Splits a multiline string into an array of rows */
const splitRows = _.pipe([
  _.split('\n'),
  _.reject(_.isEmpty),
])

/** Parses a single row (string) into an array of integers */
const parseRow = _.pipe([
  _.split(/\s+/),
  _.map(parseInt),
])

// Star #1
// -----------------------------------------------
const computeLeastGreatestChecksum = _.pipe([
  xs => xs.sort((a, b) => a - b),
  xs => _.last(xs) - _.head(xs),
])

const star_01 = _.pipe([
  splitRows,
  _.map(_.pipe([parseRow, computeLeastGreatestChecksum])),
  _.sum,
])

assert.equal(star_01(INPUT), 32020)

// Star #2
// -----------------------------------------------
const computeDivisibleChecksum = xs => {
  xs = xs.sort((a, b) => a - b)

  // O(n^2) :/
  for (let i = xs.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      const a = xs[i]
      const b = xs[j]
      if (a % b === 0) return a / b
    }
  }
}

const exercise_02 = _.pipe([
  splitRows,
  _.map(_.pipe([parseRow, computeDivisibleChecksum])),
  _.sum,
])

assert.equal(exercise_02(INPUT), 236)
