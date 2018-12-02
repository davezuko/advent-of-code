function main() {
  let input = "";
  process.stdin.on("data", data => input += data.toString().trim())
  process.stdin.on("end", () => {
    console.log(star_01(input))
    console.log(star_02(input))
  })
}

function star_01(input) {
  let freq = 0
  for (const line of input.split('\n')) {
    freq += Number.parseInt(line)
  }
  return freq
}

function star_02(input) {
  let freq = 0
  const seen = new Set([freq])
  const inputs = input.split('\n').map(str => Number.parseInt(str))
  while (true) {
    for (const line of inputs) {
      freq += Number.parseInt(line)
      if (seen.has(freq)) {
        return freq
      }
      seen.add(freq)
    }
  }
}

main()
