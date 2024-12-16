import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import { Book } from './booking.model'

const createBooking = async (payload: IBooking) => {
  const { tour, bookingSlots } = payload

  const requireTour = await Tour.findByIdAndUpdate(tour)
  if (!requireTour) {
    throw new Error('Tour not found')
  }

  const totalPrice = requireTour.price * bookingSlots
  payload.totalPrice = totalPrice
  payload.bookingStatus = 'pending'

  if (requireTour.availableSeats < bookingSlots) {
    throw new Error('Not enough seats avaiable')
  }

  const booking = await Book.create(payload)

  //available = avialable - bookslots

  const updateToure = await Tour.findByIdAndUpdate(
    tour,
    {
      $inc: {
        availableSeats: -bookingSlots,
      },
    },
    { new: true }
  )

  if (!updateToure) {
    throw new Error('fild to update tour')
  }
  return booking
}

export const bookingService = {
  createBooking,
}
