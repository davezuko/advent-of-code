const assert = require("assert")
const _ = require("redash")
const fs = require("fs")
const INPUT = fs.readFileSync("../inputs/day_03.txt", "utf8")

// Star #1
// -----------------------------------------------
function* genSpiralLayers() {
    let layer,
        layerSize = (layerStart = 1)
    while (true) {
        yield (layer = _.range(layerStart, layerStart + layerSize))
        layerStart = _.last(layer)
        layerSize += 8
    }
}

const star_01 = (target) => {
    let depth = 0,
        layer
    for (layer of genSpiralLayers()) {
        if (_.last(layer) >= target) break
        depth++
    }

    const pivot = Math.ceil((layer.length - 1) / 4)
    const start = pivot / 2
    const centers = [start].concat(_.times((n) => start + pivot * (n + 1), 3))

    const idx = layer.indexOf(target)
    const lateralOffset = Math.min.apply(
        Math,
        centers.map((c) => Math.abs(c - idx)),
    )
    return lateralOffset + depth
}

assert.equal(star_01(1), 0)
assert.equal(star_01(12), 3)
assert.equal(star_01(23), 2)
assert.equal(star_01(1024), 31)
assert.equal(star_01(277678), 475)

// Star #2
// -----------------------------------------------
const up = ([row, col]) => [row - 1, col]
const down = ([row, col]) => [row + 1, col]
const right = ([row, col]) => [row, col + 1]
const left = ([row, col]) => [row, col - 1]
const [UP, DOWN, LEFT, RIGHT] = _.juxt([up, down, left, right])([0, 0])

const getNeighbors = ([row, col]) => [
    ..._.juxt([up, down, left, right])([row, col]),
    [row + 1, col + 1],
    [row + 1, col - 1],
    [row - 1, col + 1],
    [row - 1, col - 1],
]

const exercise_02 = (target) => {
    const spiral = new Map([[0, new Map([[0, 1]])]])
    const getCellValue = ([row, col]) =>
        spiral.get(row) && spiral.get(row).get(col)
    const getValidNeighbors = _.pipe([getNeighbors, _.filter(getCellValue)])
    const getSumOfNeighbors = _.pipe([
        getValidNeighbors,
        _.map(getCellValue),
        _.sum,
    ])
    let pos = [0, 0]
    let dir = [0, 1]
    let value
    do {
        const [dy, dx] = dir
        const [row, col] = (pos = [pos[0] + dy, pos[1] + dx])

        value = getSumOfNeighbors(pos)
        spiral.set(row, spiral.get(row) || new Map())
        spiral.get(row).set(col, value)

        _.cond([
            // Change from Right -> Up
            [
                (dir) => _.equals(RIGHT, dir) && !getCellValue(up(pos)),
                () => (dir = UP),
            ],
            // Change from Up -> Left
            [
                (dir) => _.equals(UP, dir) && !getCellValue(left(pos)),
                () => (dir = LEFT),
            ],
            // Change from Left -> Down
            [
                (dir) => _.equals(LEFT, dir) && !getCellValue(down(pos)),
                () => (dir = DOWN),
            ],
            // Change from Down -> Right
            [
                (dir) => _.equals(DOWN, dir) && !getCellValue(right(pos)),
                () => (dir = RIGHT),
            ],
        ])([dy, dx])
    } while (value <= target)
    return value
}
assert.equal(exercise_02(INPUT), 279138)
