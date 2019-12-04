package main

import (
	"fmt"
	"strconv"
	"sync"
)

const low = 156218
const high = 652527

func main() {
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		fmt.Printf("Star 1: %v\n", Star1(low, high))
		wg.Done()
	}()
	go func() {
		fmt.Printf("Star 2: %v\n", Star2(low, high))
		wg.Done()
	}()
	wg.Wait()
}

func Star1(low, high int) int {
	count := 0
	for i := low; i <= high; i++ {
		pw := strconv.Itoa(i)
		if !ascending(pw) {
			continue
		}
		for j := 0; j < len(pw)-1; j++ {
			if pw[j] == pw[j+1] {
				count++
				break
			}
		}
	}
	return count
}

func Star2(low, high int) int {
	count := 0
	for i := low; i <= high; i++ {
		pw := strconv.Itoa(i)
		if !ascending(pw) {
			continue
		}
		runes := []rune(pw)
		j := 0
		for j < len(runes)-1 {
			if j == len(runes)-1 {
				break
			}
			digit := runes[j]
			if digit != runes[j+1] {
				j++
				continue
			}
			if j == len(runes)-2 || digit != runes[j+2] {
				count++
				break
			}
			for j < len(pw) && runes[j] == digit {
				j++
			}
		}
	}
	return count
}

func ascending(digits string) bool {
	for i := 0; i < len(digits)-1; i++ {
		a := int(digits[i] - '0')
		b := int(digits[i+1] - '0')
		if a > b {
			return false
		}
	}
	return true

}
