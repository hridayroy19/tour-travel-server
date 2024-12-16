// req and res manage

import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userService.createUser(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    status: true,
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users getting successfully',
    status: true,
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  // console.log(req.params)
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User getting successfully',
    status: true,
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body
  const result = await userService.updateUser(userId, body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    status: true,
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await userService.deleteUser(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    status: true,
    data: result,
  })
})
export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
