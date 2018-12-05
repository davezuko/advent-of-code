package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	dat, err := ioutil.ReadFile("../inputs/day_01.txt")
	if err != nil {
		panic(err)
	}
	input := string(dat)
	messages := make(chan int)
	go star1(input, messages)
	go star2(input, messages)
	for i := 0; i < 2; i++ {
		fmt.Println(<-messages)
	}
}

func parseInput(input string) []int {
	inputs := []int{}
	for _, str := range strings.Split(input, "\n") {
		if str == "" {
			continue
		}
		num, err := strconv.Atoi(str)
		if err != nil {
			panic(err)
		}
		inputs = append(inputs, num)
	}
	return inputs
}

func star1(input string, messages chan int) {
	freq := 0
	for _, num := range parseInput(input) {
		freq += num
	}
	messages <- freq
}

func star2(input string, messages chan int) {
	freq := 0
	i := 0
	inputs := parseInput(input)
	seen := map[int]bool{}
	for {
		num := inputs[i]
		freq += num
		if seen[freq] {
			messages <- freq
		}
		seen[freq] = true
		i += 1
		if i == len(inputs) {
			i = 0
		}
	}
}
