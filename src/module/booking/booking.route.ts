import { Router } from 'express'
import { bookingController } from './booking.controller'

const bookingRoute = Router()

bookingRoute.post('/creat-booking', bookingController.creatBooking)
bookingRoute.get('/book-all', bookingController.getBookng)
bookingRoute.get('/book/:id')
bookingRoute.put('/book/:id')

export default bookingRoute
