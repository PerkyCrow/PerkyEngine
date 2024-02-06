import Node from '../node'
import Node2D from '../nodes/node_2d'
import Rectangle from '../nodes/rectangle'
import Camera from '../nodes/camera'
import Sprite from '../nodes/sprite'
import Timer from '../nodes/timer'
import Animation from '../nodes/animation'


Node.addType(
    Node,
    Node2D,
    Rectangle,
    Camera,
    Sprite,
    Timer,
    Animation
)