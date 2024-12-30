import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";

const authRoute = Router()

authRoute.post('/register',AuthController.register)
authRoute.post('/login',AuthController.login)
authRoute.post('/forget-password',validateRequest(AuthValidation.forgetPasswordValidationSchema),AuthController.forgetPassword)
authRoute.post('/reset-password',AuthController.resetPassword)


export default authRoute