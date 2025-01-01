import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServer } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthServer.regiserIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'register is successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthServer.loginIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.ACCEPTED,
    token: result.token,
    message: 'Login is successfully',
    data: result.veryfiUser,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const result = AuthServer.forgetPasswordIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Password reset link sent to your email',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const result = AuthServer.resetPassword(req.body)
  sendResponse(res, {
    status: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Password reset successfuly',
    data: result,
  })
})

export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword,
}
