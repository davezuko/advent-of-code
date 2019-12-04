package main

import (
	"testing"
)

func TestStar1(t *testing.T) {
	got := Star1(156218, 652527)
	want := 1694
	if got != want {
		t.Fatalf("want: %v; got: %v\n", want, got)
	}
}

func TestStar2(t *testing.T) {
	got := Star2(156218, 652527)
	want := 1148
	if got != want {
		t.Fatalf("want: %v; got: %v\n", want, got)
	}
}
