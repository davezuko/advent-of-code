const fs = require('fs')
const assert = require('assert')
const input = fs.readFileSync('../inputs/day_07.txt', 'utf8')

const parseNode = node => {
  const [, name, weight, children] = node.match(/(\w+)\s\((\d+)\)(?:\s->\s)?(.*)/)
  return {
    name,
    weight: Number.parseInt(weight),
    children: children.split(',').filter(Boolean).map(s => s.trim())
  }
}

const buildTree = nodes => {
  const map = new Map(nodes.map(n => [n.name, n]))
  const buildNode = node => {
    if (!node.children.length) {
      return node
    }

    node.children = node.children.map(n => {
      if (typeof n === 'object') return n
      return buildNode(map.get(n))
    })
    nodes = nodes.filter(n => !node.children.map(c => c.name).includes(n.name))
    return node
  }

  while (nodes.length > 1) {
    nodes.forEach(buildNode)
  }
  return nodes
}

// Exercise 1
// ------------------------------------
const exercise_01 = input => {
  return buildTree(input.split('\n').filter(Boolean).map(parseNode))
}

console.log('\nrunning...\n------------------')
console.log(exercise_01(input))

// Exercise 2
// ------------------------------------
