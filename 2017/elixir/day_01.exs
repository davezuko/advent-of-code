defmodule Day_01 do
  def matches_sibling?({a, a}), do: true
  def matches_sibling?({_a, _b}), do: false

  # [1, 2, 3, 4] -> [{1, 2}, {2, 3}, {3, 4}, {4, 1}]
  def with_adjacent_sibling(xs = [head | tail]) do
    Enum.zip(xs, tail ++ [head])
  end

  # [1, 2, 3, 4] -> [{1, 3}, {2, 4}, {3, 1}, {4, 2}]
  def with_halfway_sibling(xs) do
    {init, rest} = Enum.split(xs, div(length(xs), 2))
    Enum.zip(xs, rest ++ init)
  end

  def sum_matching_siblings(siblings) do
    siblings
      |> Enum.filter(&matches_sibling?/1)
      |> Enum.map(&(Kernel.elem(&1, 0)))
      |> Enum.sum
  end

  def star_01(input) do
    with_adjacent_sibling(input)
      |> sum_matching_siblings
  end

  def exercise_02(input) do
    with_halfway_sibling(input)
      |> sum_matching_siblings
  end
end

{:ok, file} = File.read "../inputs/day_01.txt"
input = file
  |> String.trim()
  |> String.split("", trim: true)
  |> Enum.map(&String.to_integer/1)

IO.inspect Day_01.star_01(input) # 1253
IO.inspect Day_01.exercise_02(input) # 1278
