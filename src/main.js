import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
  .use(pinia)
  .mount('#app')
