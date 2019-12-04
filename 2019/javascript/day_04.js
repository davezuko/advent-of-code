const assert = require("assert")

const LOW = 156218
const HIGH = 652527

function star_1() {
  return foldl(passwords(), 0, (acc, pw) => {
    return isAscending(pw) && hasDigitPair(pw) ? acc + 1 : acc
  })
}

function star_2() {
  return foldl(passwords(), 0, (acc, pw) => {
    return isAscending(pw) && hasExactDigitPair(pw) ? acc + 1 : acc
  })
}

function foldl(iter, acc, fn) {
  for (let i of iter) acc = fn(acc, i)
  return acc
}

function *passwords() {
  for (let i = LOW; i <= HIGH; i++) yield i.toString()
}

function isAscending(pw) {
  return pw.split("").sort().join("") === pw
}

function pairs(pw) {
  return [...pw.matchAll(/(\d)(\1+)/g)].map(m => m[0])
}

function hasDigitPair(pw) {
  return pairs(pw).length > 0
}

function hasExactDigitPair(pw) {
  return pairs(pw).filter(pair => pair.length === 2).length > 0
}

assert.equal(star_1(), 1694)
assert.equal(star_2(), 1148)
