require 'set'

filepath = File.join(File.dirname(__FILE__), '../inputs/day_01.txt')
input = File.open(filepath).readlines.map(&:to_i)

def exercise_01(input)
  input.reduce(0, :+)
end

def exercise_02(input)
  seen = Set.new
  sum = 0
  input.cycle do |x|
    sum += x
    if seen.include?(sum)
      return sum
    else
      seen.add(sum)
    end
  end
end

puts exercise_01(input)
puts exercise_02(input)
