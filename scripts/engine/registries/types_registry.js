import Registry from '../registry'
import Vector2 from '../vector_2'
import ObservableVector2 from '../observable_vector_2'

const registry = new Registry()

registry.addClass(
    Vector2,
    ObservableVector2
)

export default registry
