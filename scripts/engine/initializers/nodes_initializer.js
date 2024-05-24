import Node from '../node'
import Node2D from '../nodes/node_2d'
import Rectangle from '../nodes/rectangle'
import Layer from '../nodes/layer'
import Sprite from '../nodes/sprite'
import Timer from '../nodes/timer'
import Animation from '../nodes/animation'
import SmoothAnimation from '../nodes/smooth_animation'
import AnimationTrack from '../nodes/animation_track'
import AnimationPropertyTrack from '../nodes/animation_property_track'
import AnimationSequence from '../nodes/animation_sequence'
import Physics2D from '../nodes/physics_2d'
import Dom from '../nodes/dom'


Node.register(
    Node,
    Node2D,
    Rectangle,
    Layer,
    Sprite,
    Timer,
    Animation,
    SmoothAnimation,
    AnimationTrack,
    AnimationPropertyTrack,
    AnimationSequence,
    Physics2D,
    Dom
)
