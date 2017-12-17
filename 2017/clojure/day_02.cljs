(ns advent-of-code.year_2017.day_02
  (:require [clojure.string :as str]))

(defn parse-row [row]
  (mapv js/parseInt (str/split row #"\s+")))

(def input
  (-> (.readFileSync (js/require "fs") "../inputs/day_02.txt" "utf8")
      (str/split "\n")
      (#(map parse-row %))))

(defn vec-remove [coll pos]
  (vec (concat (subvec coll 0 pos) (subvec coll (inc pos)))))

(defn find-first [f coll]
  (first (filter f coll)))

;; Exercise 1
;; ------------------------------------
(defn compute-least-greatest-checksum [row]
  (let [sorted (sort row)]
    (- (last sorted) (first sorted))))

(defn exercise-1 [rows]
  (apply + (map compute-least-greatest-checksum rows)))

;; Exercise 2
;; ------------------------------------
(defn find-divisor [i coll]
  (let [n (get coll i)]
    (find-first #(integer? (/ n %)) (vec-remove coll i))))

(defn find-divisor-result [coll]
  (fn [i n]
    (when-let [divisor (find-divisor i (vec coll))]
      (/ n divisor))))

(defn compute-divisible-checksum [row]
  (let [sorted (sort row)]
    (find-first number? (map-indexed (find-divisor-result sorted) sorted))))

(defn exercise-2 [rows]
  (apply + (map compute-divisible-checksum rows)))
