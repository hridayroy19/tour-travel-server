import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServer } from "./auth.service";

const register = catchAsync(async (req , res)=>{
     const result = await AuthServer.regiserIntoDb(req.body)

     sendResponse(res,{
        status:true,
        statusCode:httpStatus.CREATED,
        message:"register is successfully",
        data: result
     })





    }
)

export const AuthController = {
    register
}