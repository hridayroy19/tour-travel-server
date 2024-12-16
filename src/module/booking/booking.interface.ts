import mongoose from "mongoose";

export interface IBooking {
    user:mongoose.Schema.Types.ObjectId
    tour:mongoose.Schema.Types.ObjectId
    bookingSlots:number
    totalPrice:number
    bookingStatus: 'panding' | 'paid' | 'cancelled'
}