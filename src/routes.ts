import { Router } from 'express'
import UsersController from './app/controllers/UsersController'
import NewsCrawler from './app/crawlers/anvisa/NewsCrawler'
import { sendEmail } from './libs/mailgun'
import { render } from './libs/nunjucks'
// import exampleEmail from './emails/html/example.html'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({
    // message: render(exampleEmail, {
    //   username: 'Pedro Oliveira',
    // }),
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
