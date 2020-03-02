import { Router } from 'express'
import UsersController from './app/controllers/UsersController'
import NewsCrawler from './app/crawlers/anvisa/NewsCrawler'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  })
})
routes.get('/users', UsersController.index)

routes.get('/etl-anvisa', (_, res) => {
  NewsCrawler.init().then(() => {
    res.json({
      message: 'success',
    })
  })
})

export default routes
