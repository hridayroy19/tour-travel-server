import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import { Book } from './booking.model'

const createBookingIntoDB = async (payload: IBooking) => {
  const session = await mongoose.startSession()

  session.startTransaction()

  try {
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

    const booking = await Book.create([payload], { session })

    //available = avialable - bookslots

    const updateToure = await Tour.findByIdAndUpdate(
      booking[0].tour,
      {
        $inc: {
          availableSeats: -bookingSlots,
        },
      },
      { new: true, session }
    )

    if (!updateToure) {
      throw new Error('fild to update tour')
    }

    await session.commitTransaction()
    await session.endSession()

    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const getBookngIntoDB = async () => {
  const result = await Book.find()
  return result
}

export const bookingService = {
  createBookingIntoDB,
  getBookngIntoDB,
}
