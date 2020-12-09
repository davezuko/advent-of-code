import * as fs from "fs"
import * as path from "path"
import * as assert from "assert"

const myInput = fs
    .readFileSync(path.resolve(__dirname, "../inputs/day_03.txt"), "utf8")
    .split("\n")

const demoInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`.split("\n")

const traverse = ([dx, dy]: number[], slope: string[]): number => {
    let x = dx,
        y = dy,
        trees = 0

    while (y < slope.length) {
        const row = slope[y]
        if (row[x] === "#") trees++
        x += dx
        y += dy
        if (x >= row.length) {
            x = x - row.length
        }
    }
    return trees
}

const star_1 = (slope: string[]) => traverse([3, 1], slope)
const star_2 = (slope: string[]) =>
    [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]
        .map((dt) => traverse(dt, slope))
        .reduce((a, b) => a * b)

console.log(star_1(demoInput))
console.log(star_1(myInput))
console.log(star_2(demoInput))
console.log(star_2(myInput))
