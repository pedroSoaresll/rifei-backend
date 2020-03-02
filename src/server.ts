import { schedule } from 'node-cron'

import app from './app'
import NewsCrawler from './app/crawlers/anvisa/NewsCrawler'

schedule('* * * * *', () => NewsCrawler.init())

app.listen(process.env.NODE_PORT)
