import Registry from '../registry'
import DisplayRenderer from '../renderers/display_renderer'
import ContainerRenderer from '../renderers/container_renderer'
import SpriteRenderer from '../renderers/sprite_renderer'
import RectangleRenderer from '../renderers/rectangle_renderer'

const registry = new Registry()

registry.set('Sprite', SpriteRenderer)
registry.set('Container', ContainerRenderer)
registry.set('Rectangle', RectangleRenderer)
registry.set('Display', DisplayRenderer)


export default registry
