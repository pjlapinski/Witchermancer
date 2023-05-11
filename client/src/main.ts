import { createApp } from 'vue'
import App from './App.vue'
import router from '@/config/router'
import { fetchLocalization } from '@/config/localization'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

const pinia = createPinia()

fetchLocalization()
  .then(locales => {
    const i18n = createI18n({
      locale: 'en',
      messages: locales,
      globalInjection: true,
    })

    const app = createApp(App)
    app.use(router)
    app.use(pinia)
    app.use(i18n)
    app.mount('#app')
  })
