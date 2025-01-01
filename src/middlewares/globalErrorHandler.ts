/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { handlerZodError } from '../helpers/handleZodError'
import { handleValidationError } from '../helpers/handlerValidationError'
import { handleCastError } from '../helpers/handleCastError'
import { handleGenericError } from '../helpers/handleGenericError'
import { handlerDuplicateError } from '../helpers/handleDuplicateError'
import mongoose from 'mongoose'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name && err.name === 'ZodError') {
    handlerZodError(err, res)
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res)
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res)
  } else if (err.code && err.code === 11000) {
    handlerDuplicateError(err, res)
  } else if (err instanceof Error) {
    handleGenericError(err, res)
  }
}

export default globalErrorHandler
