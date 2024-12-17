import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
import bookingRoute from './module/booking/booking.route'

const app = express()

// middleware
app.use(express.json())

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
app.use("*",(req:Request,  res:Response )=>{
 res.status(400).json({
  status:false,
  message:"Route Not Found"
 })
})

export default app
