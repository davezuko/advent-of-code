defmodule Day_01 do
  def exercise_01(input = [head | siblings]) do
    compare_sibling = fn
      {a, a} -> a
      _-> 0
    end

    Enum.zip(input, siblings ++ [head])
      |> Enum.map(compare_sibling)
      |> Enum.sum
  end
end


{:ok, file} = File.read "../inputs/day_01.txt"
input = file
  |> String.trim()
  |> String.split("", trim: true)
  |> Enum.map(&String.to_integer/1)

IO.puts Day_01.exercise_01(input)
