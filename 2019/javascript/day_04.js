const assert = require("assert")

const LOW = 156218
const HIGH = 652527

function star_1() {
    let matches = 0
    for (const pw of passwords()) {
        if (isAscending(pw) && hasDigitPair(pw)) {
            matches++
        }
    }
    return matches
}

function star_2() {
    let matches = 0
    for (const pw of passwords()) {
        if (isAscending(pw) && hasExactDigitPair(pw)) {
            matches++
        }
    }
    return matches
}

function* passwords() {
    for (let i = LOW; i <= HIGH; i++) yield i.toString()
}

function isAscending(pw) {
    for (let i = 1; i < pw.length; i++) {
        if (pw[i] < pw[i - 1]) {
            return false
        }
    }
    return true
}

function pairs(pw) {
    return [...pw.matchAll(/(\d)(\1+)/g)].map((m) => m[0])
}

function hasDigitPair(pw) {
    return pairs(pw).length > 0
}

function hasExactDigitPair(pw) {
    return pairs(pw).filter((pair) => pair.length === 2).length > 0
}

assert.equal(star_1(), 1694)
assert.equal(star_2(), 1148)
