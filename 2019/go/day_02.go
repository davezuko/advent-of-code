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

	// Reset the program to the "1202 program alarm" state
	ops[1] = 12
	ops[2] = 2

	star1(ops)
}

func star1(ops []int) {
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
	fmt.Printf("%v\n", ops)
}

func parseOpcodes(input []byte) []int {
	ops := []int{}
	for _, str := range strings.Split(string(input), ",") {
		num, _ := strconv.Atoi(strings.Replace(str, "\n", "", 1))
		ops = append(ops, num)
	}
	return ops
}
