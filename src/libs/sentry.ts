import * as Sentry from '@sentry/node'
import sentryConfig from '../config/sentry'

Sentry.init({
  dsn: sentryConfig.dsn
})
