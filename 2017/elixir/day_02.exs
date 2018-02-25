defmodule Day_02 do
  def exercise_01(input) do
    input
      |> Enum.map(&(Enum.max(&1) - Enum.min(&1)))
      |> Enum.sum
  end

  def exercise_02(input) do
  end
end

{:ok, file} = File.read "../inputs/day_02.txt"

parse_row = fn (row) ->
  row
    |> String.split(~r/\s+/)
    |> Enum.map(&String.to_integer/1)
end

input = file
  |> String.trim
  |> String.split("\n")
  |> Enum.map(parse_row)

IO.inspect Day_02.exercise_01(input)
