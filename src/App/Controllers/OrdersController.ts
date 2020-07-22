import { Request, Response } from 'express'
import RaffleModel from 'App/Models/Raffle'
import { OrdersPackage } from 'Packages/Orders'

export interface UserPaymentInfoPayload {
  senderHash: string
  itemId1: string
  itemDescription1: string
  itemAmount1: string
  itemQuantity1: string
  senderName: string
  senderCPF: string
  senderAreaCode: string
  senderPhone: string
  senderEmail: string
  installmentValue: string
  creditCardHolderName: string
  creditCardHolderCPF: string
  creditCardHolderBirthDate: string
  creditCardHolderAreaCode: string
  creditCardHolderPhone: string
  billingAddressStreet: string
  billingAddressNumber: string
  billingAddressComplement: string
  billingAddressDistrict: string
  billingAddressPostalCode: string
  billingAddressCity: string
  billingAddressState: string
  billingAddressCountry: string
  cardCvv: number
  cardExpirationMonth: number
  cardExpirationYear: number
  cardNumber: number
}

export interface OrderStoreBody {
  raffles: [
    {
      id: string
      code: number
    }
  ]
  paymentInfo: UserPaymentInfoPayload
}
class OrdersController {
  async store(req: Request<never, never, OrderStoreBody>, res: Response) {
    const { userParticipant } = req
    const { raffles, paymentInfo } = req.body

    const rafflesPromise = raffles.map((raffle) => {
      return RaffleModel.findOne({ where: { id: raffle.id } })
    })
    const rafflesInstance = await Promise.all(rafflesPromise)

    const rafflesBought = raffles.map((raffle) => ({
      raffleId: raffle.id,
      raffleNumber: raffle.code,
      isRaffled: false,
    }))

    const ordersPackage = OrdersPackage()
    const order = await ordersPackage.create({
      userParticipant,
      rafflesBought,
      rafflesInstance,
      paymentInfo,
    })

    return res.status(200).json({
      order,
    })
  }
}

export default new OrdersController()
