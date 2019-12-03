package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	dat, _ := ioutil.ReadFile("2019/inputs/day_02.txt")
	ops := parseOpcodes(dat)
	fmt.Printf("Star 1: %v\n", Star1(clone(ops)))
	fmt.Printf("Star 2: %v\n", Star2(clone(ops)))
}

func Star1(ops []int) int {
	ops[1] = 12
	ops[2] = 2
	return runProgram(ops)
}

func Star2(ops []int) int {
	res := make(chan int)
	for i := 0; i <= 99; i++ {
		for j := 0; j <= 99; j++ {
			go func(ops []int, i int, j int) {
				defer func() {
					if err := recover(); err != nil {
						return
					}
				}()
				ops[1] = i
				ops[2] = j
				if runProgram(ops) == 19690720 {
					res <- 100*i + j
				}
			}(clone(ops), i, j)
		}
	}
	return <-res
}

func runProgram(ops []int) int {
	i := 0
	exited := false
	for exited != true {
		switch ops[i] {
		case 1:
			arg1 := ops[ops[i+1]]
			arg2 := ops[ops[i+2]]
			outi := ops[i+3]
			ops[outi] = arg1 + arg2
		case 2:
			arg1 := ops[ops[i+1]]
			arg2 := ops[ops[i+2]]
			outi := ops[i+3]
			ops[outi] = arg1 * arg2
		case 99:
			exited = true
		}
		i += 4
	}
	return ops[0]
}

func parseOpcodes(input []byte) []int {
	ops := []int{}
	for _, str := range strings.Split(string(input), ",") {
		num, _ := strconv.Atoi(strings.Replace(str, "\n", "", 1))
		ops = append(ops, num)
	}
	return ops
}

func clone(ops []int) []int {
	clone := make([]int, len(ops))
	copy(clone, ops)
	return clone
}
