import express from 'express'
import cors from 'cors'

import logger from './Libs/winston'
import routes from './routes'

class App {
  public express: express.Application

  public constructor() {
    logger.info('init server')

    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    logger.info('init middlewares')

    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    //
  }

  private routes(): void {
    logger.info('init routes')

    this.express.use(routes)
  }
}

export default new App().express
