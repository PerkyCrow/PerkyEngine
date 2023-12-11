
import {createApp} from 'vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-amber/theme.css'
import 'primeicons/primeicons.css'
import PerkyEditor from './editor/components/editor.vue'

if (process.env.NODE_ENV === 'development') {
    globalThis.__VUE_OPTIONS_API__ = true
    globalThis.__VUE_PROD_DEVTOOLS__ = true
} else {
    globalThis.__VUE_OPTIONS_API__ = false
    globalThis.__VUE_PROD_DEVTOOLS__ = false
}

const app = createApp(PerkyEditor)
app.use(PrimeVue)
app.mount('#perky_editor')
