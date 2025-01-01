import { Request, Response } from 'express'
import { tourService } from './tour.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createTour = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = await tourService.createTour(body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Tour create successfuly',
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getTours = async (req: Request, res: Response) => {
  try {
    const result = await tourService.getTours(req.query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Tours get successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.getSingleTour(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Tour get successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body
    const result = await tourService.updateTour(id, body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Tour updated successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.deleteTour(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Tour deleted successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

// const getNextSchedule = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id
//     const result = await tourService.getNextSchedule(id)

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       message: 'Tours nextschedule successfully',
//       status: true,
//       data: result,
//     })
//   } catch (error) {
//     res.send({
//       success: false,
//       message: 'Something went wrong ',
//       error,
//     })
//   }
// }

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  // getNextSchedule,
}
