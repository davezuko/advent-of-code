const _ = require('redash')

const INPUT = 277678

const draw = (layers) => {
  console.log(layers.map(l => JSON.stringify(l)))
}

// Star #1
// -----------------------------------------------
const exercise_01 = (target) => {
  const layers = []
  const addLayer = () => {
    if (!layers.length) {
      layers.push([1])
      return
    }

    const sideLen = _.inc(2 * layers.length)
    const start = _.last(_.last(layers))
    layers.push(_.range(start + 1, start + ((sideLen * 4) - 4) + 1))
  }

  while (!_.contains(target, _.last(layers) || [])) addLayer()
  const layer = _.last(layers)
  layer.unshift(layer.pop())

  const rotate = 2 * (layers.length - 1)
  const centers = [rotate / 2]
  centers.push(centers[0] + rotate)
  centers.push(centers[1] + rotate)
  centers.push(centers[2] + rotate)

  const idx = layer.indexOf(target)
  const offset = Math.min.apply(Math, centers.map(c => Math.abs(c - idx))) - 1
  return offset + layers.length
}

console.log(exercise_01(INPUT))
