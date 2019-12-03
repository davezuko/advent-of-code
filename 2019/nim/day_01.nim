import strutils, math

proc calc_fuel(mass: float64): float64 =
  floor(mass / 3) - 2

proc star_1(): float64 =
  result = 0.0
  for line in lines "2019/inputs/day_01.txt":
    result += calc_fuel(parse_float(line))

proc star_2(): float64 =
  result = 0.0
  for line in lines "2019/inputs/day_01.txt":
    var mass = calc_fuel(parse_float(line))
    while mass > 0:
      result += mass
      mass = calc_fuel(mass)

echo star_1()
echo star_2()
