file_path = File.expand_path("../../inputs/day_01.txt", __FILE__)
input     = File.open(file_path).readlines.map(&:to_i)

def star_01(masses)
  masses.map { |mass| calc_fuel(mass) }.sum
end

def star_02(masses)
  masses.map do |mass|
    fuel = 0
    mass = calc_fuel(mass)
    while mass > 0
      fuel += mass
      mass = calc_fuel(mass)
    end
    fuel
  end.sum
end

def calc_fuel(mass)
 (mass / 3).floor - 2
end

puts star_01(input) # 3514064
puts star_02(input) # 5268207
