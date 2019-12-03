from strformat import fmt
from strutils import parseInt, replace, split
from sequtils import insert, map

var input = readFile("2019/inputs/day_02.txt").replace("\n", "").split(",").map(parse_int)

proc run(noun: int, verb: int): int =
  var ops = input.deep_copy
  ops[1] = noun
  ops[2] = verb

  var pc = 0
  var op = ops[pc]
  while op != 99:
    let arg1 = ops[ops[pc + 1]]
    let arg2 = ops[ops[pc + 2]]
    let pos  = ops[pc + 3]
    case op:
      of 1:
        ops[pos] = arg1 + arg2
      of 2:
        ops[pos] = arg1 * arg2
      else:
        echo fmt"Unknown operator '{op}' at index '{pc}'"
        raise
    pc += 4
    op = ops[pc]
  return ops[0]

proc star_1(input: seq[int]): int =
  run(noun = 12, verb = 2)

proc star_2(input: seq[int]): int =
  for noun in 0..99:
    for verb in 0..99:
      if run(noun, verb) == 19690720:
        return 100 * noun + verb

echo star_1(input)
echo star_2(input)
