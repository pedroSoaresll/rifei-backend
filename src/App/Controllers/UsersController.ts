import { Request, Response } from 'express'
import User from 'App/Models/User'

class UsersController {
  async index(_: Request, res: Response): Promise<void> {
    const user = await User.findAll()

    res.json({
      message: 'user controller list',
      user,
    })
  }
}

export default new UsersController()
