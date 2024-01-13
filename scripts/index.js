import World from './engine/world'
import Node from './engine/node'

const world = new World()
const root = new Node()

world.attachRoot(root)

console.log(world)