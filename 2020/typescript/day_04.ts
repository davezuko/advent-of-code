import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"

const myInput = fs.readFileSync(
    path.resolve(__dirname, "../inputs/day_04.txt"),
    "utf8",
)

const demoInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

interface Passport {
    byr: number
    iyr: number
    eyr: number
    hgt: {val: number; unit: string}
    hcl: string
    ecl: string
    pid: string
}

function* passports(input: string): Iterable<Partial<Passport>> {
    let pp = {}
    for (const line of input.split("\n")) {
        if (line.length) {
            const fields = line.split(" ")
            for (const field of fields) {
                const [key, value] = field.split(":")
                switch (key) {
                    case "byr":
                    case "iyr":
                    case "eyr":
                        pp[key] = Number.parseInt(value)
                        break
                    case "hgt": {
                        const [, val, unit] = value.match(/(\d+)(\w+)/)!
                        pp[key] = {val: Number.parseInt(val), unit}
                        break
                    }
                    default:
                        pp[key] = value
                }
            }
        } else {
            yield pp
            pp = {}
        }
    }
    yield pp
}

const hasRequiredFields = (pp: Partial<Passport>): pp is Passport => {
    const required = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"])
    return (
        Object.keys(pp).filter((k) => required.has(k)).length === required.size
    )
}

const star_1 = (input: string) => {
    let valid = 0
    for (const pp of passports(input)) {
        if (hasRequiredFields(pp)) {
            valid++
        }
    }
    return valid
}

const star_2 = (input: string) => {
    // allowed values
    const hgt = new Set(["cm", "in"])
    const ecl = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"])
    const hcl = /#[abcdef\d]{6}$/

    let valid = 0
    for (const pp of passports(input)) {
        if (!hasRequiredFields(pp)) continue
        if (pp.byr < 1920 || pp.byr > 2002) continue
        if (pp.iyr < 2010 || pp.iyr > 2020) continue
        if (pp.eyr < 2020 || pp.eyr > 2030) continue
        if (!hgt.has(pp.hgt.unit)) continue
        if (pp.hgt.unit === "cm" && (pp.hgt.val < 150 || pp.hgt.val > 193))
            continue
        if (pp.hgt.unit === "in" && (pp.hgt.val < 59 || pp.hgt.val > 76))
            continue

        if (!hcl.test(pp.hcl)) continue
        if (!ecl.has(pp.ecl)) continue
        if (pp.pid.length !== 9) continue

        valid++
    }
    return valid
}

assert.strictEqual(star_1(demoInput), 2)
assert.strictEqual(star_1(myInput), 170)
assert.strictEqual(star_2(demoInput), 2)
assert.strictEqual(star_2(myInput), 103)
