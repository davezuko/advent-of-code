import strutils

const low  = 156218
const high = 652527

iterator sequences(str: string): seq[char] =
  var i = 0
  while i < str.high:
    let ch = str[i]
    var sequence: seq[char]
    while i <= str.high and str[i] == ch:
      sequence.add(ch)
      i += 1
    yield sequence

func ascending(str: string): bool =
  for i in str.low..str.high - 1:
    if parse_int($str[i]) > parse_int($str[i + 1]):
      return false
  return true

proc main(low, high: int): void =
  var star_1 = 0
  var star_2 = 0

  for i in low..high:
    let pw = $i
    if not ascending(pw): continue

    var found_pair = false
    var found_exact_pair = false
    for s in sequences(pw):
      if len(s) == 2:
        found_pair = true
        found_exact_pair = true
        break
      if len(s) > 2:
        found_pair = true
        continue
    if found_exact_pair:
      star_1 += 1
      star_2 += 1
    elif found_pair:
      star_1 += 1
  echo "star 1: " & $star_1
  echo "star 2: " & $star_2

main(low, high)
