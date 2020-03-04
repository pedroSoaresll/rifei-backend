import { Router } from 'express'
import UsersController from './app/controllers/UsersController'
import NewsCrawler from './app/crawlers/anvisa/NewsCrawler'
import { sendEmail } from './libs/mailgun'
import { render } from './libs/nunjucks'
import { TemplatesName, getTemplate } from './helper/email'

const routes = Router()

routes.get('/', async (req, res) => {
  const html = render(getTemplate(TemplatesName.example), {
    username: 'Pedro Oliveira',
  })

  await sendEmail({
    html,
    subject: 'Teste alerta anvisa',
    to: 'pedrodepaivasoaresll@gmail.com'
  })

  res.json({
    message: html
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
