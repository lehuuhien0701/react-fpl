export const i18n = {
  defaultLocale: 'fr',
  locales: ['en', 'fr', 'de' ],
  localeDetection: true
} as const

export type Locale = (typeof i18n)['locales'][number]