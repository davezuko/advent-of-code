const assert = require('assert')
const _ = require('redash')
const fs = require('fs')
const INPUT = fs.readFileSync('../inputs/day_08.txt', 'utf8')
  .split('\n')
  .filter(s => s.trim())

const parseInstruction = (str) => {
  const [target, op, opVal, __, ...cond] = str.split(' ')
  return { target, op, opAmt: Number.parseInt(opVal), cond: cond.join(' ') }
}

const checkCondition = (registers, cond) => {
  const [condReg, comparator, amt] = cond.split(' ')
  return eval(`${registers.get(condReg) || 0} ${comparator} ${amt}`)
}

const runInstruction = (registers, { target, op, opAmt, cond }) => {
  if (!checkCondition(registers, cond)) return registers

  const curVal = registers.get(target) || 0
  switch (op) {
    case 'inc':
      registers.set(target, curVal + opAmt)
      return registers
    case 'dec':
      registers.set(target, curVal - opAmt)
      return registers
    default:
      throw new Error(`Unknown operation: ${op}`)
  }
}

// Star #1
// -----------------------------------------------
const star_01 = _.pipe([
  _.map(parseInstruction),
  instructions => _.reduce(runInstruction, new Map(), instructions),
  registers => Math.max(...registers.values()),
])

assert.equal(star_01([
  'b inc 5 if a > 1',
  'a inc 1 if b < 5',
  'c dec -10 if a >= 1',
  'c inc -20 if c == 10',
]), 1)

assert.equal(star_01(INPUT), 5215)

// Star #2
// -----------------------------------------------
const exercise_02 = _.pipe([
  _.map(parseInstruction),
  instructions => {
    let registers = new Map()
    return Math.max(...instructions.map((ins) => {
      return Math.max(...(registers = runInstruction(registers, ins)).values())
    }, registers))
  },
])

assert.equal(exercise_02([
  'b inc 5 if a > 1',
  'a inc 1 if b < 5',
  'c dec -10 if a >= 1',
  'c inc -20 if c == 10',
]), 10)

assert.equal(exercise_02(INPUT), 6419)
