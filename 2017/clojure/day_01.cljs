(ns advent-of-code.year_2017.day_01
  (:require [clojure.string :as str]))

(def input (.readFileSync (js/require "fs") "../inputs/day_01.txt" "utf8"))

(defn filter-indexed [pred col]
  (vec (keep-indexed #(when (pred %2 %1 col) %2) col)))

(defn parse-digits [s]
  (vec (remove js/isNaN (mapv #(js/parseInt %) (str/split s "")))))

;; Exercise 1
;; ------------------------------------
(defn get-neighbor [i col]
  (or (get col (inc i)) (first col)))

(defn is-same-as-neighbor [v i col]
  (= v (get-neighbor i col)))

(defn exercise-1 [input]
  (apply + (filter-indexed is-same-as-neighbor (parse-digits input))))

;; Exercise 2
;; ------------------------------------
(defn get-halfway-neighbor [i col]
  (let [maxIdx (dec (count col))
        tryIdx (+ i (/ (count col) 2))
        nxtIdx (if (<= tryIdx maxIdx) tryIdx (- tryIdx maxIdx 1))]
    (get col nxtIdx)))

(defn is-same-as-halfway [v i col]
  (= v (get-halfway-neighbor i col)))

(defn exercise-2 [input]
  (apply + (filter-indexed is-same-as-halfway (parse-digits input))))
