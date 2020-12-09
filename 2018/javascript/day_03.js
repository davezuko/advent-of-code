function main() {
    let input = ""
    process.stdin.on("data", (data) => (input += data.toString().trim()))
    process.stdin.on("end", () => {
        console.log(star_01(input))
        console.log(star_02(input))
    })
}

class Claim {
    constructor({id, x, y, width, height}) {
        Object.assign(this, {id, x, y, width, height})
    }

    *coordinates() {
        for (let x = this.x; x < this.x + this.width; x++) {
            for (let y = this.y; y < this.y + this.height; y++) {
                yield [x, y]
            }
        }
    }
}
Claim.fromString = function fromString(str) {
    const [__, id, x, y, width, height] = str
        .match(/^#(\d+).*?(\d+),(\d+).*?(\d+)x(\d+)/)
        .map((num) => Number.parseInt(num))

    return new Claim({id, x, y, width, height})
}

function applyClaim(grid, claim) {
    for (const [x, y] of claim.coordinates()) {
        const key = `${x},${y}`
        grid.set(key, (grid.get(key) || 0) + 1)
    }
}

function star_01(input) {
    const claims = input.split("\n").map(Claim.fromString)
    const grid = new Map()

    claims.forEach((claim) => applyClaim(grid, claim))
    return [...grid.values()].filter((claims) => claims >= 2).length
}

function star_02(input) {
    const claims = input.split("\n").map(Claim.fromString)
    const grid = new Map()

    claims.forEach((claim) => applyClaim(grid, claim))
    return claims.find((claim) => {
        const coordinates = [...claim.coordinates()]
        return coordinates.every(([x, y]) => {
            return grid.get(`${x},${y}`) === 1
        })
    })
}

main()
