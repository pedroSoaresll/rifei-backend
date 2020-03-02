import User from '../models/User'
import { Request, Response } from 'express'

class UsersController {
  async index(_: Request, res: Response): Promise<void> {
    const user = await User.find({})

    res.json({
      message: 'user controller list',
      user
    })
  }
}

export default new UsersController()
