import { Router } from 'express'
import UsersParticipantController from './App/Controllers/UsersParticipantController'
import RafflesController from 'App/Controllers/RafflesController'

const routes = Router()

routes.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})
routes.post('/users', UsersParticipantController.store)
routes.get('/raffles', RafflesController.index)

export default routes
