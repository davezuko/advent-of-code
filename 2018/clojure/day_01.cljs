(ns advent-of-code.year_2017.day_01
  (:require [clojure.string :as str] [fs]))

(defn compute-frequencies [input]
  (reductions + (map js/parseInt input)))

(defn take-first-repeat
  ([coll] (take-first-repeat coll #{}))
  ([coll seen]
   (let [value (first (take 1 coll))]
     (if (contains? seen value)
       value
       (recur (drop 1 coll) (conj seen value))))))

(defn star_01 [input]
  (last (compute-frequencies input)))

(defn star_02 [input]
  (take-first-repeat (compute-frequencies (cycle input))))

(def input (str/split-lines (.readFileSync fs "../inputs/day_01.txt" "utf8")))
(assert (= (star_01 input) 592))
(assert (= (star_02 input) 241))
