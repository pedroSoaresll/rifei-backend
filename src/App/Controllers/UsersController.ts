import { Request, Response } from 'express'
import UserParticipant from 'App/Models/UserParticipant'
import UserModel from 'App/Models/User'

class UsersController {
  async index(_: Request, res: Response): Promise<void> {
    const user = await UserParticipant.findAll({
      include: {
        model: UserModel,
        as: 'user'
      }
    })

    res.json({
      message: 'user controller list',
      user,
    })
  }
}

export default new UsersController()
