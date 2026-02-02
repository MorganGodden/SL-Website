import './assets/main.css'
import './assets/primevue.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

import DialogService from 'primevue/dialogservice'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app.use(PrimeVue, {
  theme: 'none'
})

app.use(ToastService)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)

app.use(DialogService)
app.directive('tooltip', Tooltip)

app.use(createPinia())
app.use(router)

app.mount('#app')
