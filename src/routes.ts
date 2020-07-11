import { Router } from 'express'
import UsersController from './App/Controllers/UsersController'

const routes = Router()

routes.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})
routes.get('/users', UsersController.index)

export default routes
