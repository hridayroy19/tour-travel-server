import { Router } from 'express'
import { bookingController } from './booking.controller'

const bookingRoute = Router()

bookingRoute.post('/creat-booking', bookingController.creatBooking)
bookingRoute.get('/book')
bookingRoute.get('/book/:id')
bookingRoute.put('/book/:id')

export default bookingRoute
