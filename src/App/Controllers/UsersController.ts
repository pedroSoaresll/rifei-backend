import { Request, Response } from 'express'

class UsersController {
  async index(_: Request, res: Response): Promise<void> {
    res.json({
      message: 'user controller list',
    })
  }
}

export default new UsersController()
