// import { Response } from "express"

// type TResponse<T> = {
//     statusCode: number
//     success: boolean
//     message: string
//     data: T
// }


// const sendResponse = <T>(
//     res: Response,
//     data: TResponse<T>
// ) => {
//     res.send(data?.statusCode).json({
//         success: data.success,
//         message: data.message,
//         data: data.data

//     })
// }

// export default sendResponse;
import { Response } from 'express'

type TSuccessResponse<T> = {
  status?: boolean
  statusCode: number
  message: string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    status: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  })
}

export default sendResponse
