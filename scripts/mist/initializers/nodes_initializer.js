import Node from 'engine/node'
import Board from '../nodes/board'
import Reagent from '../nodes/reagent'
import Cluster from '../nodes/cluster'

Node.register(
    Board,
    Reagent,
    Cluster
)
