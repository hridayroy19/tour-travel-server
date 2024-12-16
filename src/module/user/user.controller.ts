// req and res manage

import { Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const result = await userService.createUser(payload)

    sendResponse(res,
      {
        statusCode: httpStatus.OK,
        message: 'User created successfully',
        status: true,
        data: result
      })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser()


    sendResponse(res, { statusCode: httpStatus.OK, message: 'Users getting successfully', status: true, data: result })

  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.params)
    const userId = req.params.userId
    const result = await userService.getSingleUser(userId)

     sendResponse(res, { statusCode: httpStatus.OK, message: 'User getting successfully', status: true, data: result })

  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const body = req.body
    const result = await userService.updateUser(userId, body)

   sendResponse(res, { statusCode: httpStatus.OK, message: 'User updated successfully', status: true, data: result })

  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.deleteUser(userId)

    sendResponse(res, { statusCode: httpStatus.OK, message: 'User deleted successfully', status: true, data: result })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
