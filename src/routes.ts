import { Router } from 'express'
import UsersParticipantController from './App/Controllers/UsersParticipantController'
import RafflesController from 'App/Controllers/RafflesController'
import { authenticateUser } from 'App/Validations/Authentication'
import AuthenticationParticipantsController from 'App/Controllers/AuthenticationController'
import OrdersController from 'App/Controllers/OrdersController'
import { authenticated } from 'App/Middlewares/authenticated'

const routes = Router()

routes.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})

routes.post('/authentication', authenticateUser, AuthenticationParticipantsController.store)

routes.post('/users', UsersParticipantController.store)

routes.get('/raffles', RafflesController.index)

routes.post('/orders', authenticated, OrdersController.store)

export default routes
