import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"

const myInput = fs.readFileSync(
    path.resolve(__dirname, "../inputs/day_05.txt"),
    "utf8",
)


interface Seat {
    row: number
    col: number
    sid: number
}
const getSeat = (desc: string): Seat => {
    let row = [0, 127]
    let col = [0, 7]
    for (const d of desc) {
        switch (d) {
            case "F":
                row[1] = row[0] + Math.floor((row[1] - row[0]) / 2)
                break
            case "B":
                row[0] = row[0] + Math.floor((row[1] - row[0]) / 2) + 1
                break
            case "L":
                col[1] = col[0] + Math.floor((col[1] - col[0]) / 2)
                break
            case "R":
                col[0] = col[0] + Math.floor((col[1] - col[0]) / 2) + 1
                break
        }
    }
    return {
        row: row[0],
        col: col[0],
        sid: row[0] * 8 + col[0]
    }
}

const star_1 = (input: string) => {
    const seats = input.split("\n").map(getSeat).sort((a, b) => a.sid - b.sid)
    return seats[seats.length - 1].sid
}

const star_2 = (input: string) => {
    const seats = input.split("\n").map(getSeat).sort((a, b) => a.sid - b.sid)
    for (let i = 0; i < seats.length - 1; i++) {
        if (seats[i + 1].sid - seats[i].sid === 2) {
            return seats[i].sid + 1
        }
    }
}

assert.strictEqual(star_1(myInput), 855)
assert.strictEqual(star_2(myInput), 552)