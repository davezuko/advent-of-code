const fs = require("fs")
const path = require("path")
const assert = require("assert")

function main() {
    const input = fs.readFileSync(
        path.resolve(__dirname, "./../inputs/day_08.txt"),
        "utf8",
    )
    assert.equal(star_01(input), 36027)
}

function star_01(input) {
    let chars = input.split(" ").map((num) => Number.parseInt(num))
    let metadata = 0
    let i = 0
    function walk_children() {
        let num_children = chars[i++]
        let num_metadata = chars[i++]
        while (num_children > 0) {
            walk_children()
            num_children--
        }
        while (num_metadata > 0) {
            metadata += chars[i++]
            num_metadata--
        }
    }
    walk_children()
    return metadata
}

main()
