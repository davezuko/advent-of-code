defmodule Day_02 do
  def star_01(input) do
    input
      |> Enum.map(&(Enum.max(&1) - Enum.min(&1)))
      |> Enum.sum
  end

  def compute_division_checksum([head | tail]) do
    checksum = compute_division_checksum(head, tail)
    if is_number(checksum) do
      checksum
    else
      compute_division_checksum(tail)
    end
  end

  defp compute_division_checksum(_a, []) do
    nil
  end

  defp compute_division_checksum(a, [a | tail]) do
    compute_division_checksum(a, tail)
  end

  defp compute_division_checksum(a, [b | tail]) do
    [min | [max]] = Enum.sort([a, b])
    if rem(max, min) == 0 do
      div(max, min)
    else
      compute_division_checksum(a, tail)
    end
  end

  def exercise_02(input) do
    input
      |> Enum.map(&compute_division_checksum/1)
      |> Enum.sum
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

IO.inspect Day_02.star_01(input)
IO.inspect Day_02.exercise_02(input)
