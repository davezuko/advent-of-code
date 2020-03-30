use std::io;
use std::io::{BufRead};

fn main() {
    let mut total_fuel = 0;
    let mut total_fuel_recursive = 0;

    for line in io::stdin().lock().lines() {
        let mass: i32 = line.unwrap().parse().unwrap();
        total_fuel += calculate_fuel(mass);
        total_fuel_recursive += calculate_fuel_recursive(mass);
    }
    println!("star 1: {}\nstar 2: {}", total_fuel, total_fuel_recursive);
}

fn calculate_fuel(mass: i32) -> i32 {
    return ((mass as f64 / 3.0).trunc() - 2.0) as i32;
}

fn calculate_fuel_recursive(mass: i32) -> i32 {
    let mut fuel = 0;
    let mut mass = calculate_fuel(mass);
    while mass > 0 {
        fuel += mass;
        mass = calculate_fuel(mass);
    }
    return fuel;
}
