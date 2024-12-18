import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
import bookingRoute from './module/booking/booking.route'
import { notFound } from './middlewares/notFound'
import authRoute from './module/auth/auth.route'

const app = express()

// middleware
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/book', bookingRoute)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

//golbal error handelar
app.use(globalErrorHandler)

//route not found
app.use(notFound)

export default app
