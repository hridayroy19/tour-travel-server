/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import httpStatus from 'http-status'

export const handleCastError = (err: any, res: Response) => {
  res.status(httpStatus.BAD_GATEWAY).json({
    success: false,
    message: err.message,
    error: err,
  })
}
