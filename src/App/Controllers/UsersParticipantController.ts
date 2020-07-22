import { Request, Response } from 'express'
import UserModel, { UserCreationAttributes } from 'App/Models/User'
import UserParticipantModel from 'App/Models/UserParticipant'

class UsersParticipantController {
  async store(
    req: Request<never, never, UserCreationAttributes>,
    res: Response
  ) {
    try {
      const { email, googleId, name, phone, photo } = req.body

      const userParticipant = await UserParticipantModel.create(
        {
          user: {
            email,
            googleId,
            name,
            phone,
            photo,
          },
        },
        {
          include: [
            {
              model: UserModel,
              as: 'user',
            },
          ],
        }
      )

      return res.status(200).json(userParticipant)
    } catch (err) {
      const error = err as Error
      return res.status(400).json({
        error: error.message,
      })
    }
  }
}

export default new UsersParticipantController()
