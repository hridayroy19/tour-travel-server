import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingService } from './booking.service'

const creatBooking = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await bookingService.createBooking(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user create susscsfull',
    status: true,
    data: result,
  })
})

export const bookingController = {
  creatBooking,
}
