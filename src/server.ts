import { init } from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import { schedule } from 'node-cron'

import app from './app'
import NewsCrawler from './app/crawlers/anvisa/NewsCrawler'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd()

console.log(process.env.npm_package_version)

init({
  dsn: process.env.SENTRY_DSN,
  release: `farma-alerts@${process.env.npm_package_version}`,
  integrations: [new RewriteFrames({
    root: global.__rootdir__
  })]
})

schedule('* * * * *', () => NewsCrawler.init())

app.listen(process.env.NODE_PORT)
