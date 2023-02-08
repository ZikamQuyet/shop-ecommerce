import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AUTH_VI from './locale/vi/auth.json'
import DEFAULT_LAYOUT_VI from './locale/vi/defaultLayout.json'

export const resources = {
  vi: {
    auth: AUTH_VI,
    defaultLayout: DEFAULT_LAYOUT_VI
  }
} as const
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  ns: ['auth', 'defaultLayout'],
  interpolation: {
    escapeValue: false
  }
})
