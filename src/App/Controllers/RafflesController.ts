import { Request, Response } from 'express'
import RaffleModel from 'App/Models/Raffle'
import UserOwnerModel from 'App/Models/UserOwner'

class RafflesController {
  async index(_: Request, res: Response): Promise<void> {
    const raffles = await RaffleModel.findAll({
      include: {
        model: UserOwnerModel,
        as: 'userOwner',
      },
    })

    res.json({
      message: 'raffles controller list',
      raffles,
    })
  }
}

export default new RafflesController()
