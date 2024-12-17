import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingService } from './booking.service'

const creatBooking = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await bookingService.createBookingIntoDB(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'booking create susscsfull',
    status: true,
    data: result,
  })
})

//get all booking

const getBookng = catchAsync(async (req, res) => {
  const result = await bookingService.getBookngIntoDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Get all booking susscsfull',
    status: true,
    data: result,
  })
})

export const bookingController = {
  creatBooking,
  getBookng,
}
