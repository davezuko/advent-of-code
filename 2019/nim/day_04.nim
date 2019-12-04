import strutils, re

const low  = 156218
const high = 652527

func ascending(num: int): bool =
  let str = $num
  for i in str.low..str.high - 1:
    if parse_int($str[i]) > parse_int($str[i + 1]):
      return false
  return true

func has_pair(num: int): bool =
  contains($num, re"(\d)\1")

proc has_exact_pair(num: int): bool =
  for group in find_all($num, re"(\d)(\1+)"):
    if len(group) == 2: return true
  false

func star_1(low, high: int): int =
  result = 0
  for pw in low..high:
    if ascending(pw) and has_pair(pw):
      result += 1

proc star_2(low, high: int): int =
  result = 0
  for pw in low..high:
    if ascending(pw) and has_exact_pair(pw):
      result += 1

do_assert star_1(low, high) == 1694
do_assert star_2(low, high) == 1148
