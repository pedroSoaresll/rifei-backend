import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import UserModel from 'App/Models/User'
import UserParticipantModel, { UserParticipantInstance } from 'App/Models/UserParticipant'

interface AuthenticationStore {
  googleToken: string;
  email: string;
  name: string;
}

class AuthenticationParticipantsController {
  async store(req: Request<never, never, AuthenticationStore>, res: Response) {
    const { googleToken, email, name } = req.body

    let userParticipant: UserParticipantInstance

    userParticipant = await UserParticipantModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: {
            googleId: googleToken
          },
        }
      ]
    })

    // if not exist user with this google token, create one
    if (!userParticipant) {
      userParticipant = await UserParticipantModel.create({
        user: {
          googleId: googleToken,
          email,
          name,
        }
      }, {
        include: [
          {
            model: UserModel,
            as: 'user'
          }
        ]
      })
    }

    const token = sign({
      sub: userParticipant.id,
      name: userParticipant.user.name,
      email: userParticipant.user.email
    }, process.env.SECRET_KEY)

    return res.json({
      token
    })
  }
}

export default new AuthenticationParticipantsController()
