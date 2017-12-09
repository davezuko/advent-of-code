const assert = require('assert')
const _ = require('redash')
const fs = require('fs')
const INPUT = fs.readFileSync('../inputs/day_05.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(n => Number.parseInt(n))

// Star #1
// -----------------------------------------------
const exercise_01 = ([...input]) => {
  let idx = jumps = 0
  while (idx < input.length) {
    const nextIdx = idx + input[idx]
    input[idx] = input[idx] + !!++jumps // :)
    idx = nextIdx
  }
  return jumps
}

assert.equal(exercise_01([0, 3, 0, 1, -3]), 5)
assert.equal(exercise_01(INPUT), 387096)

// Star #2
// -----------------------------------------------
const exercise_02 = ([...input]) => {
  let idx = jumps = 0
  while (idx < input.length) {
    const offset = (jumps++, input[idx])
    const nextIdx = idx + offset
    input[idx] = offset + (offset >= 3 ? -1 : 1)
    idx = nextIdx
  }
  return jumps
}

assert.equal(exercise_02([0, 3, 0, 1, -3]), 10)
assert.equal(exercise_02(INPUT), 28040648)
