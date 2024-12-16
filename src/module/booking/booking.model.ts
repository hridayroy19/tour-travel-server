import { model, Schema } from 'mongoose'
import { IBooking } from './booking.interface'

export const bookingSchema = new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: 'Tour',
  },
  bookingSlots: {
    type: Number,
    required: [true, 'A booking must have bookedSlots'],
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    required: [true, 'A booking must have a bookingStatus'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'A booking must have a price'],
  },
})

export const Book = model<IBooking>('booking', bookingSchema)
