import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import UserModel from 'App/Models/User'
import UserParticipantModel, {
  UserParticipantInstance,
} from 'App/Models/UserParticipant'

interface AuthenticationStore {
  googleToken: string
  email: string
  name: string
}

export interface AuthenticationPayload {
  sub: string
  name: string
  email: string
}

class AuthenticationParticipantsController {
  async store(
    req: Request<never, never, AuthenticationStore>,
    res: Response
  ): Promise<Response<{ token: string }>> {
    const { googleToken, email, name } = req.body

    let userParticipant: UserParticipantInstance

    userParticipant = await UserParticipantModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: {
            googleId: googleToken,
          },
        },
      ],
    })

    // if not exist user with this google token, create one
    if (!userParticipant) {
      userParticipant = await UserParticipantModel.create(
        {
          user: {
            googleId: googleToken,
            email,
            name,
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
    }

    const token = sign(
      {
        sub: userParticipant.id,
        name: userParticipant.user.name,
        email: userParticipant.user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '2h',
      }
    )

    return res.json({
      token,
    })
  }
}

export default new AuthenticationParticipantsController()
