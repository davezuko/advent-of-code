import * as fs from "fs"
import * as assert from "assert"

function star1(masses: number[]) {
    return sum(masses.map(calcFuel))
}

function star2(masses: number[]) {
    return sum(masses.map(mass => {
        let fuel = 0
        while ((mass = calcFuel(mass)) > 0) {
            fuel += mass
        }
        return fuel
    }))
}

function calcFuel(mass: number) {
    return Math.floor(mass / 3) - 2
}

function sum(xs: number[]) {
    return xs.reduce((a, b) => a + b)
}

// Test
const input = fs.readFileSync("../inputs/day_01.txt", "utf8")
const masses = input.split("\n").filter(Boolean).map(str => Number.parseInt(str))
assert.equal(star1(masses), 3514064)
assert.equal(star2(masses), 5268207)
