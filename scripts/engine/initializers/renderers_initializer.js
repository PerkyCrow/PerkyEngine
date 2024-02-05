import Renderer from '../renderer'
import DisplayRenderer from '../renderers/display_renderer'
import ContainerRenderer from '../renderers/container_renderer'
import SpriteRenderer from '../renderers/sprite_renderer'
import RectangleRenderer from '../renderers/rectangle_renderer'
import CameraRenderer from '../renderers/camera_renderer'


Renderer.setRenderers(
    SpriteRenderer,
    CameraRenderer,
    RectangleRenderer,
    ContainerRenderer,
    DisplayRenderer
)
