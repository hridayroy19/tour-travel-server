/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import httpStatus from 'http-status'

export const handleGenericError = (err: any, res: Response) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message,
    error: err,
  })
}
