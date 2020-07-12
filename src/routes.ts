import { Router } from 'express'
import UsersController from './App/Controllers/UsersController'
import RafflesController from 'App/Controllers/RafflesController'

const routes = Router()

routes.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})
routes.get('/users', UsersController.index)
routes.get('/raffles', RafflesController.index)

export default routes
