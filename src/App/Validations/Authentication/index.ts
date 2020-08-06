import * as yup from 'yup'
import { NextFunction, Request, Response } from 'express'

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<string[]>> {
  console.log('body', req.body)

  const schema = yup.object().shape({
    googleToken: yup.string().required('googleToken field is required'),
    name: yup.string().required('name field is required'),
    email: yup
      .string()
      .email('email format is invalid')
      .required('email field is required'),
  })

  try {
    await schema.validate(req.body)
    return next()
  } catch (err) {
    const error = err as yup.ValidationError
    return res.status(400).json(error.errors)
  }
}
