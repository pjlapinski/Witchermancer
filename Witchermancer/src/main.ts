import { createApp } from 'vue'
import App from './App.vue'
import router from '@/config/router'
import '@/config'

const app = createApp(App)
app.use(router)
app.mount('#app')
