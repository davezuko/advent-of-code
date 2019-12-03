package main

import (
	"math"
	"strconv"
	"strings"
	"sync"
)

// Coord represents a single point on a 2d plane
type Coord struct {
	X, Y int
}

// Distance returns the total distance from the origin
func (c *Coord) ManhattanDistance() int {
	return int(math.Abs(float64(c.X)) + math.Abs(float64(c.Y)))
}

// Star1 finds the point closest to the origin where two wires interesect.
func Star1(input string) int {
	wires := strings.Split(input, "\n")
	grid1 := Grid{}
	grid2 := Grid{}

	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		grid1.LayWire(wires[0])
		wg.Done()
	}()
	go func() {
		grid2.LayWire(wires[1])
		wg.Done()
	}()
	wg.Wait()

	var closest int
	for _, intersection := range intersections(&grid1, &grid2) {
		distance := intersection.Coord.ManhattanDistance()
		if distance != 0 && (closest == 0 || distance < closest) {
			closest = distance
		}
	}
	return closest
}

type Grid struct {
	grid map[Coord]int
}

func (g *Grid) LayWire(wire string) {
	g.grid = make(map[Coord]int)
	for i, coord := range Walk(wire) {
		if g.grid[coord] == 0 {
			g.grid[coord] = i + 1
		}
	}
}

// Star2 finds the distance to the intersection of two wires with the lowest
// total travel distance.
func Star2(input string) int {
	wires := strings.Split(input, "\n")
	grid1 := Grid{}
	grid2 := Grid{}

	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		grid1.LayWire(wires[0])
		wg.Done()
	}()
	go func() {
		grid2.LayWire(wires[1])
		wg.Done()
	}()
	wg.Wait()

	var bestDistance int
	for _, intersection := range intersections(&grid1, &grid2) {
		distance := intersection.TravelDistance
		if distance != 0 && (bestDistance == 0 || distance < bestDistance) {
			bestDistance = distance
		}
	}
	return bestDistance
}

// Walk follows a series of steps (e.g. "R1,L2,U1,D4") and returns all
// the coordinates that were walked, in order.
func Walk(wire string) []Coord {
	var coords []Coord
	var x, y int
	for _, step := range strings.Split(wire, ",") {
		distance, _ := strconv.Atoi(step[1:])
		switch string(step[0]) {
		case "L":
			for i := 1; i <= distance; i++ {
				x--
				coords = append(coords, Coord{x, y})
			}
		case "R":
			for i := 1; i <= distance; i++ {
				x++
				coords = append(coords, Coord{x, y})
			}
		case "U":
			for i := 1; i <= distance; i++ {
				y++
				coords = append(coords, Coord{x, y})
			}
		case "D":
			for i := 1; i <= distance; i++ {
				y--
				coords = append(coords, Coord{x, y})
			}
		}
	}
	return coords
}

type Intersection struct {
	Coord          Coord
	TravelDistance int
}

func intersections(a *Grid, b *Grid) []Intersection {
	var intersections []Intersection
	for coord, distance := range a.grid {
		if b.grid[coord] != 0 {
			intersections = append(intersections, Intersection{coord, distance + b.grid[coord]})
		}
	}
	return intersections
}
