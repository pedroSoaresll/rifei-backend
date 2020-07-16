import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import UserParticipantModel, { UserParticipantInstance } from 'App/Models/UserParticipant'
import UserModel from 'App/Models/User'
import { AuthenticationPayload } from 'App/Controllers/AuthenticationController'

export interface AuthorizationRequestParams {
  userParticipant: UserParticipantInstance;
}

export async function authenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(400).json({
        message: 'You need to pass authorization token'
      })
    }

    const [, token] = authorization.split(' ')
    const jwtPayload = verify(token, process.env.SECRET_KEY) as AuthenticationPayload

    const userParticipant = await UserParticipantModel.findOne({
      where: {
        id: jwtPayload.sub
      },
      include: [
        {
          model: UserModel,
          as: 'user'
        }
      ]
    })

    if (!userParticipant) {
      return res.status(401).json({
        message: 'not authorized'
      })
    }

    req.userParticipant = userParticipant

    next()
  } catch (err) {
    const error = err as Error
    return res.status(500).json({
      message: error.message
    })
  }
}
