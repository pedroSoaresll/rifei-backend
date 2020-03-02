import User from '../models/User'

class UsersController {
  async index(req, res): Promise<void> {
    const user = await User.find({})

    res.json({
      message: 'user controller list',
      user
    })
  }
}

export default new UsersController()
