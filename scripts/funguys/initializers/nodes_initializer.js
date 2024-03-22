import Node from 'engine/node'
import Mushroom from '../nodes/mushroom'
import ForestBackground from '../nodes/forest_background'
import Sidebar from '../nodes/sidebar'
import Spore from '../nodes/spore'
import SporeEmitter from '../nodes/spore_emitter'
import GrowingSlot from '../nodes/growing_slot'

Node.addType(
    Mushroom,
    ForestBackground,
    Sidebar,
    SporeEmitter,
    Spore,
    GrowingSlot
)
