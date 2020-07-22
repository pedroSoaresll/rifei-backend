import { Router } from 'express'
import UsersParticipantController from './App/Controllers/UsersParticipantController'
import RafflesController from 'App/Controllers/RafflesController'
import { authenticateUser } from 'App/Validations/Authentication'
import AuthenticationParticipantsController from 'App/Controllers/AuthenticationController'
import OrdersController from 'App/Controllers/OrdersController'
import { authenticated } from 'App/Middlewares/authenticated'
import PagSeguroService from 'Services/pagseguro'

const routes = Router()

routes.get('/', async (req, res) => {
  const paymentResult = await PagSeguroService().creditCardPayment({
    itemId1: '0001',
    itemDescription1: 'NotebookPrata',
    itemAmount1: '15.00',
    itemQuantity1: '1',
    reference: 'REF1234',
    senderName: 'Pedro Oliveira',
    senderCPF: '22111944785',
    senderAreaCode: '11',
    senderPhone: '56273440',
    senderEmail: 'pedrodepaivasoaresll@sandbox.pagseguro.com.br',
    senderHash:
      'd3e95b2213c99b163c01e02db215f05e343eaad50ea4db5df9b0c5627540366b',
    creditCardToken: '2bd5a54a1e6b498a8b4a2d52b21410df',
    installmentValue: '15.00',
    creditCardHolderName: 'Pedro Oliveira',
    creditCardHolderCPF: '22111944785',
    creditCardHolderBirthDate: '27/10/1987',
    creditCardHolderAreaCode: '11',
    creditCardHolderPhone: '56273440',
    billingAddressStreet: 'Av.Brig.FariaLima',
    billingAddressNumber: '1384',
    billingAddressComplement: '5oandar',
    billingAddressDistrict: 'JardimPaulistano',
    billingAddressPostalCode: '01452002',
    billingAddressCity: 'SaoPaulo',
    billingAddressState: 'SP',
    billingAddressCountry: 'BRA',
  })
  res.json({ message: 'Hello World', paymentResult })
})

routes.post(
  '/authentication',
  authenticateUser,
  AuthenticationParticipantsController.store
)

routes.post('/users', UsersParticipantController.store)

routes.get('/raffles', RafflesController.index)

routes.post('/orders', authenticated, OrdersController.store)

export default routes
