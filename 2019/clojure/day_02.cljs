(ns advent-of-code.year-2019.day-01
  (:require [fs] [clojure.string :as str]))

(def input (->> (str/split (.readFileSync fs "2019/inputs/day_02.txt" "utf8") #",")
               (mapv #(Number.parseInt %))))

(defn execute [input pc]
  (let [[op p1 p2 dest] (subvec input pc)]
    (let [arg1 (get input p1)
          arg2 (get input p2)]
      (case op
        1 (assoc input dest (+ arg1 arg2))
        2 (assoc input dest (* arg1 arg2))))))

(defn run-program
  ([input] (run-program input 0))
  ([input pc] (if (= 99 (get input pc))
                (first input)
                (recur (execute input pc) (+ 4 pc)))))

(defn star-1 [input]
  (run-program (-> input
                   (assoc 1 12)
                   (assoc 2 2))))

(defn star-2 [input]
  (let [desired-output 19690720]
    (->> (cartesian-product (range 100) (range 100))
        (map (fn [[noun verb]]
               (let [in (-> input (assoc 1 noun) (assoc 2 verb))]
                (when (= (run-program in) desired-output)
                  (+ (* 100 noun) verb)))))
        (filter some?)
        (first))))

(defn cartesian-product [as bs]
  (mapcat identity (map (fn [a] (map (fn [b] [a, b]) bs)) as)))

(println (star-1 input))
(println (star-2 input))
