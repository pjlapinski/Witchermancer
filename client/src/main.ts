import App from './App.vue'
import router from '@/config/router'
import { fetchLocalization } from '@/config/localization'
import { useUserStore } from '@/domain/store/user'
import { isUserAuthenticated, keepAlive } from '@/domain/api'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n, PluralizationRule } from 'vue-i18n'
import Vue3TouchEvents, { type Vue3TouchEventsOptions } from 'vue3-touch-events'

const pinia = createPinia()

fetchLocalization().then(locales => {
  const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') ?? 'en',
    messages: locales,
    globalInjection: true,
    pluralRules: {
      pl: polishPlural
    },
  })

  const app = createApp(App)
  app.use(router)
  app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
    disableClick: false,
  })
  app.use(pinia)
  app.use(i18n)

  setInterval(() => {
    keepAlive()
  }, 1000 * 60)

  isUserAuthenticated().then(res => {
    const user = useUserStore()
    user.isAuthenticated = res
    app.mount('#app')
  })
})

const polishPlural : PluralizationRule = (choice, choicesLen, orgRule) => {
  // one, few, many
  const abs = Math.abs(choice)
  if (!Number.isInteger(abs)) return 1
  if (abs === 1) return 0
  const mod10 = abs % 10
  const mod100 = abs % 100
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 1
  return 2
}
