import { AnyZodObject } from './../../node_modules/zod/lib/types.d'

import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body)
    next()
  })
}

export default validateRequest
