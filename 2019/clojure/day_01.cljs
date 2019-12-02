(ns advent-of-code.year-2019.day-01
  (:require [fs] [clojure.string :as str]))

(def input (->> (.readFileSync fs "2019/inputs/day_01.txt" "utf8")
               str/split-lines
               (map #(Number.parseInt %))))

(defn sum [nums]
  (reduce + 0 nums))

(defn mass->fuel [mass]
  (- (Math.floor (/ mass 3)) 2))

(defn calculate-total-fuel
  ([mass] (calculate-total-fuel mass 0))
  ([mass total-fuel] (let [fuel (mass->fuel mass)]
                       (if (> fuel 0)
                         (recur fuel (+ total-fuel fuel))
                         total-fuel))))

(defn star-01 [masses]
  (sum (map mass->fuel masses)))

(defn star-02 [masses]
  (sum (map calculate-total-fuel masses)))

(assert (= (star-01 input) 3514064))
(assert (= (star-02 input) 5268207))
