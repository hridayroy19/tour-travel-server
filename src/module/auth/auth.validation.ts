import { z } from 'zod'

const forgetPasswordValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
})

export const AuthValidation = {
  forgetPasswordValidationSchema,
}
