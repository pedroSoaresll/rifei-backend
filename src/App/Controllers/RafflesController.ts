import { Request, Response } from 'express'
import RaffleModel from 'App/Models/Raffle'
import UserOwnerModel from 'App/Models/UserOwner'

export interface Pagination {
  page: number
  total: number
  perPage: number
}

class RafflesController {
  async index(
    req: Request<{}, {}, {}, Pagination>,
    res: Response
  ): Promise<void> {
    const { page = 0, perPage = 10 } = req.query

    const raffles = await RaffleModel.findAll({
      include: {
        model: UserOwnerModel,
        as: 'userOwner',
      },
      limit: Number(perPage),
      offset: Number(page),
    })

    res.json(raffles)
  }
}

export default new RafflesController()
