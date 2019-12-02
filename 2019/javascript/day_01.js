const fs = require("fs")
const path = require("path")
const assert = require("assert")
const file_path = path.resolve(__dirname, "../inputs/day_01.txt")
const input = fs.readFileSync(file_path, "utf8")
  .split("\n")
  .filter(Boolean)
  .map(line => Number.parseInt(line))

function star_01(masses) {
  return masses.map(calc_fuel).reduce((acc, mass) => acc + mass)
}

function star_02(masses) {
  return masses.map(mass => {
    let fuel = 0
    while ((mass = calc_fuel(mass)) > 0) {
      fuel += mass
    }
    return fuel
  }).reduce((acc, mass) => acc + mass)
}

function calc_fuel(mass) {
  return Math.floor(mass / 3) - 2
}

assert.equal(star_01(input), 3514064)
assert.equal(star_02(input), 5268207)
