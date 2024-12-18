import { USER_ROLE } from "./user.constants"

export interface IUser {
  name: string
  age?: number
  email: string
  password:string
  photo?: string | null
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}

// user interface
export type TUserRole = keyof typeof USER_ROLE;