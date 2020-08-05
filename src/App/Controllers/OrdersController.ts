import { Request, Response } from 'express'
import RaffleModel from 'App/Models/Raffle'
import { OrdersPackage } from 'Packages/Orders'

export interface UserPaymentInfoPayload {
  senderHash: string
  itemQuantity1: number
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
  raffleId: string
  raffles: [
    {
      code: number
    }
  ]
  paymentInfo: UserPaymentInfoPayload
}

const ordersPackage = OrdersPackage()

class OrdersController {
  async store(req: Request<never, never, OrderStoreBody>, res: Response) {
    const { userParticipant } = req
    const { raffles, paymentInfo, raffleId } = req.body

    const raffleInstance = await RaffleModel.findOne({
      where: { id: raffleId },
    })

    const rafflesBought = raffles.map((raffle) => ({
      raffleId,
      raffleNumber: raffle.code,
      isRaffled: false,
    }))

    const order = await ordersPackage.create({
      userParticipant,
      rafflesBought,
      raffleInstance: raffleInstance,
      paymentInfo,
    })

    return res.status(200).json(order)
  }
}

export default new OrdersController()
