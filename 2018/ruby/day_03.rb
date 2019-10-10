file = File.join(File.dirname(__FILE__), '../inputs/day_03.txt')
lines = File.open(file).readlines

CLAIM_FORMAT = /^#(\d+)\s*@\s*(\d+),(\d+):\s*(\d+)x(\d+)/

class Claim
  def initialize(id, x, y, width, height)
    @id = id
    @x = x.to_i
    @y = y.to_i
    @width = width.to_i
    @height = height.to_i
  end

  def coordinates
    (@x..@x + @width - 1).map do |x|
      (@y..@y + @height - 1).map do |y|
        [x, y]
      end
    end.flatten(1)
  end

  def self.from_s(str)
    str.match(CLAIM_FORMAT) { |m| Claim.new(*m.captures) }
  end
end

class Grid
  def initialize
    @rows = Hash.new()
  end

  def insert_claim(claim)
    claim.coordinates.each do |coord|
      x, y = coord
      @rows[y] = {} unless @rows.key?(y)
      @rows[y][x] = 0 unless @rows[y].key?(x)
      @rows[y][x] += 1
    end
  end

  def values()
    @rows.values.map(&:values).flatten.select{|x| x >= 2 }.length
  end

  def value_at(x, y)
    @rows[y] && @rows[y][x]
  end

  def print_row(y)
    (-50..50).map do |x|
      value_at(x, y) || "."
    end.join("")
  end

  def to_s
    ys = @rows.keys.sort
    (ys.first - 2..ys.last + 2).each do |y|
      puts print_row(y)
    end
  end
end

def star_01(claims)
  grid = Grid.new
  claims.each do |claim|
    grid.insert_claim(claim)
  end
  # grid.to_s
  grid.values
end


#lines = """#1 @ 1,3: 4x4
##2 @ 3,1: 4x4
##3 @ 5,5: 2x2""".lines
claims = lines.map do |line|
  Claim.from_s(line)
end

puts star_01(claims).inspect
