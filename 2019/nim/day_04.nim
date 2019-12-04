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

func ascending(num: int): bool =
  let str = $num
  for i in str.low..str.high - 1:
    if parse_int($str[i]) > parse_int($str[i + 1]):
      return false
  return true

func has_pair(num: int): bool =
  for sequence in sequences($num):
    if len(sequence) >= 2: return true
  false

func has_exact_pair(num: int): bool =
  for sequence in sequences($num):
    if len(sequence) == 2: return true
  false

func star_1(low, high: int): int =
  result = 0
  for pw in low..high:
    if ascending(pw) and has_pair(pw):
      result += 1

func star_2(low, high: int): int =
  result = 0
  for pw in low..high:
    if ascending(pw) and has_exact_pair(pw):
      result += 1

echo "star 1: " & $star_1(low, high)
echo "star 2: " & $star_2(low, high)
