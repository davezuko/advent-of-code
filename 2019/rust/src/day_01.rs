/// Returns the amount of fuel needed to support `mass`.
pub fn calculate_fuel(mass: i32) -> i32 {
    ((mass as f64 / 3.0).trunc() - 2.0) as i32
}

/// Returns the amount of fuel needed to support `mass` and the fuel itself.
pub fn calculate_fuel_rec(mass: i32) -> i32 {
    let fuel = calculate_fuel(mass);
    if fuel > 0 {
        fuel + calculate_fuel_rec(fuel)
    } else {
        0
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::io::{BufRead, BufReader};

    fn get_input_masses() -> impl Iterator<Item = i32> {
        let file = fs::File::open("../inputs/day_01.txt").unwrap();
        let reader = BufReader::new(file);
        reader
            .lines()
            .map(|line| line.unwrap().parse::<i32>().unwrap())
    }

    #[test]
    fn test_star_1() {
        let fuel: i32 = get_input_masses().map(calculate_fuel).sum();
        assert_eq!(fuel, 3514064);
    }

    #[test]
    fn test_star_2() {
        let fuel: i32 = get_input_masses().map(calculate_fuel_rec).sum();
        assert_eq!(fuel, 5268207);
    }
}
