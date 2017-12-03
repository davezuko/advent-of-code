const assert = require('assert')
const _ = require('redash')

const INPUT = 277678

// Star #1
// -----------------------------------------------
function *genSpiralLayers () {
  let layer, layerSize = layerStart = 1
  while (true) {
    yield layer = _.range(layerStart, layerStart + layerSize)
    layerStart = _.last(layer)
    layerSize += 8
  }
}

const exercise_01 = (target) => {
  let depth = 0, layer
  for (layer of genSpiralLayers()) {
    if (_.last(layer) >= target) break
    depth++
  }

  const pivot = Math.ceil((layer.length - 1) / 4)
  const start = pivot / 2
  const centers = [start].concat(_.times(n => start + (pivot * (n + 1)), 3))

  const idx = layer.indexOf(target)
  const lateralOffset = Math.min.apply(Math, centers.map(c => Math.abs(c - idx)))
  return lateralOffset + depth
}

assert.equal(exercise_01(1), 0)
assert.equal(exercise_01(12), 3)
assert.equal(exercise_01(23), 2)
assert.equal(exercise_01(1024), 31)
assert.equal(exercise_01(277678), 475)
