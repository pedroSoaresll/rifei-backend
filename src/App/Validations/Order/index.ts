import * as yup from 'yup'
import { NextFunction, Request, Response } from 'express'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({})
}
