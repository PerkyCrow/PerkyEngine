import Node from 'engine/node'
import Mushroom from '../nodes/mushroom'
import ForestBackground from '../nodes/forest_background'
import SporeEmitter from '../nodes/spore_emitter'

Node.addType(
    Mushroom,
    ForestBackground,
    SporeEmitter
)
