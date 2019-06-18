defmodule AdventOfCode.Day_01 do
  def star_01(input) do
    input |> parse_frequencies |> Enum.sum
  end

  def star_02(input) do
    frequencies = input |> parse_frequencies

    Stream.cycle(frequencies)
    |> Stream.scan(&(&1 + &2))
    |> first_repeat
  end

  def first_repeat(stream) do
    Enum.reduce_while(stream, MapSet.new, fn x, seen ->
      if x in seen do
        {:halt, x}
      else
        {:cont, MapSet.put(seen, x)}
      end
    end)
  end

  def parse_frequencies(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.to_integer(x) end)
  end
end

input = File.read!("../inputs/day_01.txt")
592 = AdventOfCode.Day_01.star_01(input)
241 = AdventOfCode.Day_01.star_02(input)
