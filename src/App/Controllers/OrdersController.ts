import { Request, Response } from 'express'
import RaffleModel from 'App/Models/Raffle'
import OrderModel from 'App/Models/Order'
import RaffleBoughtModel from 'App/Models/RaffleBought'

export interface OrderStoreBody {
  raffles: [
    {
      id: string;
      code: number;
    }
  ];
}
class OrdersController {
  async store(req: Request<never, never, OrderStoreBody>, res: Response) {
    const { userParticipant } = req
    const { raffles } = req.body

    const rafflesPromise = raffles.map(raffle => {
      return RaffleModel.findOne({ where: { id: raffle.id } })
    })
    const rafflesInstance = await Promise.all(rafflesPromise)
    const totalAmount = rafflesInstance.reduce((previousValue, currentValue) => previousValue + currentValue.rafflePrice, 0)
    const rafflesBought = raffles.map(raffle => ({
      raffleId: raffle.id,
      raffleNumber: raffle.code,
      isRaffled: false
    }))

    const order = await OrderModel.create({
      totalAmount,
      userParticipantId: userParticipant.id,
      rafflesBought
    }, {
      include: [
        {
          model: RaffleBoughtModel,
          as: 'rafflesBought'
        }
      ]
    })

    return res.status(200).json({
      order,
    })
  }
}

export default new OrdersController()
