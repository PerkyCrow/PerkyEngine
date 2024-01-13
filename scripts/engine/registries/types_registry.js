import Registry from '../registry'
import Vector2 from '../types/vector_2'
import ObservableVector2 from '../types/observable_vector_2'

const registry = new Registry()

registry.addClass(
    Vector2,
    ObservableVector2
)

export default registry
