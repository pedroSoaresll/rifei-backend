import { init } from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import { schedule } from 'node-cron'

import app from './app'
import NewsCrawler from './app/crawlers/anvisa/NewsCrawler'
import { sendSimpleText } from './app/services/slack'

const initSentry = (): void => {
  init({
    dsn: process.env.SENTRY_DSN,
    release: `farma-alerts@${process.env.npm_package_version}`,
    integrations: [new RewriteFrames({
      root: global.__rootdir__
    })]
  })
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd()

initSentry()

console.log(process.env.npm_package_version)

schedule('* * * * *', () => {
  initSentry()

  NewsCrawler.init()
})

app.listen(process.env.NODE_PORT)
