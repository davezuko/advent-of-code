(ns advent-of-code.year_2017.day_02
  (:require [clojure.string :as str] [fs] [path]))

(defn lines [str] (remove str/blank? (str/split-lines str)))

(defn has-num-repeats? [num str]
  (->> (str/split str "")
       (group-by identity)
       (vals)
       (some #(= num (count %)))))

(defn num-lines-with-repeats [num lines]
  (reduce + 0 (filter pos? (map #(has-num-repeats? num %) lines))))

(defn star_01 [input]
  (let [rows (lines input)]
    (* (num-lines-with-repeats 2 rows) (num-lines-with-repeats 3 rows))))

(def file (.resolve path js/__dirname "../inputs/day_02.txt"))
(def input (.readFileSync fs file "utf8"))
(assert (has-num-repeats? 2 "bababc"))
(assert (= 5658 (star_01 input)))
(println (star_01 input))
