const assert = require('assert')
const _ = require('redash')

const INPUT = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11]

const findHighestBank = (banks) => {
  let highest = 0
  for (let i = 0; i < banks.length; i++) {
    if (banks[i] > banks[highest]) highest = i
  }
  return highest
}

const findCycle = ([...input]) => {
  const configurations = new Set()
  let reconfigs = 0
  while (!configurations.has(input.toString())) {
    configurations.add(input.toString())
    reconfigs++
    let idx = findHighestBank(input)
    let blocks = input[idx]
    input[idx] = 0
    while (blocks--) {
      idx = idx < input.length - 1 ? idx + 1 : 0
      input[idx] = input[idx] + 1
    }
  }
  return [reconfigs, input]
}

// Star #1
// -----------------------------------------------
const exercise_01 = (input) => findCycle(input)[0]

assert.equal(exercise_01([0, 2, 7, 0]), 5)
assert.equal(exercise_01(INPUT), 7864)


// Star #2
// -----------------------------------------------
const exercise_02 = (input) => findCycle(findCycle(input)[1])[0]

assert.equal(exercise_02([0, 2, 7, 0]), 4)
assert.equal(exercise_02(INPUT), 1695)
