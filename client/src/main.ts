import App from './App.vue'
import router from '@/config/router'
import { fetchLocalization } from '@/config/localization'
import { useUserStore } from '@/domain/store/user'
import { isUserAuthenticated } from '@/domain/api'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

const pinia = createPinia()

fetchLocalization().then(locales => {
  const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') ?? 'en',
    messages: locales,
    globalInjection: true,
  })

  const app = createApp(App)
  app.use(router)
  app.use(pinia)
  app.use(i18n)

  isUserAuthenticated().then(res => {
    const user = useUserStore()
    user.isAuthenticated = res
    app.mount('#app')
  })
})
