package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"strconv"
	"strings"
	"sync"
)

func main() {
	dat, _ := ioutil.ReadFile("2019/inputs/day_01.txt")
	masses := parseLines(string(dat))

	var wg sync.WaitGroup
	wg.Add(2)
	star1(masses, &wg)
	star2(masses, &wg)
	wg.Wait()
}

func parseLines(input string) []int {
	masses := []int{}
	for _, str := range strings.Split(input, "\n") {
		if str == "" {
			continue
		}
		num, err := strconv.Atoi(str)
		if err != nil {
			panic(err)
		}
		masses = append(masses, num)
	}
	return masses
}

func calcFuel(mass int) int {
	return int(math.Floor(float64(mass)/3)) - 2
}

func star1(masses []int, wg *sync.WaitGroup) {
	fuel := 0
	for _, mass := range masses {
		fuel += calcFuel(mass)
	}
	fmt.Printf("Star 1: %v\n", fuel)
	wg.Done()
}

func star2(masses []int, wg *sync.WaitGroup) {
	fuel := 0
	for _, mass := range masses {
		mass = calcFuel(mass)
		for mass > 0 {
			fuel += mass
			mass = calcFuel(mass)
		}
	}
	fmt.Printf("Star 2: %v\n", fuel)
	wg.Done()
}
