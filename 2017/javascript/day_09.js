const assert = require('assert')
const _ = require('redash')
const fs = require('fs')
const INPUT = fs.readFileSync('../inputs/day_09.txt', 'utf8').trim()

const getGroupValue = (group, parentValue = 0) => {
  if (!group.length) return parentValue

  return group.reduce((acc, child) => {
    return acc + getGroupValue(child, parentValue + 1)
  }, parentValue)
}

const consumeGroup = (pos, chars) => {
  const group = []
  let childGroup, childGarbage
  let garbage = ''

  while (pos < chars.length) {
    switch (chars[pos++]) {
      case '!':
        pos++
        continue
      case '<':
        [childGarbage, pos] = consumeGarbage(pos, chars)
        garbage += childGarbage
        continue
      case '{':
        [childGroup, pos, childGarbage] = consumeGroup(pos, chars)
        garbage += childGarbage
        group.push(childGroup)
        continue
      case '}':
        return [group, pos, garbage]
    }
  }
}

const consumeGarbage = (pos, chars) => {
  let garbage = ''

  while (pos < chars.length) {
    const char = chars[pos++]
    switch (char) {
      case '!':
        pos++
        continue
      case '>':
        return [garbage, pos]
      default:
        garbage += char
    }
  }
}

// Star #1
// -----------------------------------------------
const exercise_01 = (input) => [consumeGroup(1, input)[0]]

assert.deepEqual(exercise_01('{}'), [ [] ])
assert.deepEqual(exercise_01('{{{}}}'), [ [ [ [] ] ] ])
assert.deepEqual(exercise_01('{{}, {}}'), [ [ [], [] ] ])
assert.deepEqual(exercise_01('{<{}, {}, {{}}>}'), [ [] ])
assert.equal(getGroupValue(exercise_01('{}')), 1)
assert.equal(getGroupValue(exercise_01('{{{}}}')), 6)
assert.equal(getGroupValue(exercise_01('{{},{}}')), 5)
assert.equal(getGroupValue(exercise_01('{{<ab>},{<ab>},{<ab>},{<ab>}}')), 9)
assert.equal(getGroupValue(exercise_01('{{<!!>},{<!!>},{<!!>},{<!!>}}')), 9)
assert.equal(getGroupValue(exercise_01('{{<a!>},{<a!>},{<a!>},{<ab>}}')), 3)

// Star #2
// -----------------------------------------------
const exercise_02 = (input) => consumeGroup(1, input)[2].length

assert.equal(getGroupValue(exercise_01(INPUT)), 17537)
