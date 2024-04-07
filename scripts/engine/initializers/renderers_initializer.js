import Renderer from '../renderer'
import DisplayRenderer from '../renderers/display_renderer'
import ContainerRenderer from '../renderers/container_renderer'
import SpriteRenderer from '../renderers/sprite_renderer'
import RectangleRenderer from '../renderers/rectangle_renderer'
import LayerRenderer from '../renderers/layer_renderer'
import DomRenderer from '../renderers/dom_renderer'


Renderer.setRenderers(
    SpriteRenderer,
    LayerRenderer,
    DomRenderer,
    RectangleRenderer,
    ContainerRenderer,
    DisplayRenderer
)
