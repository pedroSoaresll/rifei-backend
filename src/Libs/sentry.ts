import * as Sentry from '@sentry/node'
import sentryConfig from '../Config/sentry'

Sentry.init({
  dsn: sentryConfig.dsn
})
