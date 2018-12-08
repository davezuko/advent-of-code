function main() {
  let input = "";
  process.stdin.on("data", data => input += data.toString().trim())
  process.stdin.on("end", () => {
    console.log(star_01(input))
    console.log(star_02(input))
  })
}

function star_01(input) {
  let pairs = 0
  let triplets = 0

  const rows = input.split('\n')
  for (const row of rows) {
    const seen = new Map()
    for (const char of row.split('')) {
      seen.set(char, (seen.get(char) || 0) + 1)
    }
    const occurrences = [...seen.values()]
    if (occurrences.includes(2)) pairs++
    if (occurrences.includes(3)) triplets++
  }
  return pairs * triplets
}

function star_02(input) {
  const rows = input.split('\n').map(str => str.split(''))
  let best = ''

  for (let i = 0; i < rows.length; i++) {
    const chars = rows[i]
    for (let j = i + 1; j < rows.length; j++) {
      const matching = chars.filter((char, i) => char === rows[j][i])
      if (matching.length > best.length) {
        best = matching
      }
    }
  }
  return best.join('')
}

main()
