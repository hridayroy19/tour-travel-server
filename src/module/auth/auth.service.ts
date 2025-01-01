import { IUser } from '../user/user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../user/user.model'
import config from '../../config'
import sendMail from '../../utils/sendEmail'

const regiserIntoDb = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const loginIntoDb = async (payload: { email: string; password: string }) => {
  // console.log(payload);

  // const user = await User.findOne({email:payload?.email}).select('+password')
  const user = await User.findOne({ email: payload?.email }).select('+password')
  // console.log(user);

  if (!user) {
    throw new Error('user is not found')
  }

  const userSatatus = user?.userStatus

  if (userSatatus === 'inactive') {
    throw new Error('user is Inactive')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new Error('Wrong password !! Try again')
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, 'secrect', { expiresIn: '1d' })
  const veryfiUser = { neme: user?.name, email: user?.email, role: user?.role }

  return { token, veryfiUser }
}

const forgetPasswordIntoDb = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload?.email })
  console.log(user, 'email')

  if (!user) {
    throw new Error('User not found!!')
  }

  if (user.userStatus === 'inactive') {
    throw new Error('User is Blocked !')
  }

  //creat token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, 'secrect', { expiresIn: '1h' })

  const resetLink = `http://localhost:5173/reset-password?_id=${user?._id}&token=${token}`
  //  console.log( resetLink);
  await sendMail(user?.email, 'Reset password link', resetLink)
}

const resetPassword = async (payload: {
  id: string
  token: string
  password: string
}) => {
  const user = await User.findById(payload.id)

  if (!user) {
    throw new Error('User not found!')
  }

  if (user?.userStatus === 'inactive') {
    throw new Error('User is blocked!')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jwt.verify(payload.token, 'secrect', (err, decoded) => {
    if (err) {
      throw new Error('Invalid or expired token')
    }
  })

  //hash the new password
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.becript_solt_ront)
  )
  user.password = payload.password

  // console.log(user?.password)
  const result = await User.findByIdAndUpdate(user._id, user, { new: true })
  return result
}

export const AuthServer = {
  regiserIntoDb,
  loginIntoDb,
  forgetPasswordIntoDb,
  resetPassword,
}
