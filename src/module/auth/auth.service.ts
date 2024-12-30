import { IUser } from "../user/user.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../user/user.model";


const regiserIntoDb = async (payload: IUser) => {
    const result = await User.create(payload)
    return result
}

const loginIntoDb = async (payload: { email: string; password: string }) => {
    // console.log(payload);
    
    
// const user = await User.findOne({email:payload?.email}).select('+password')
const user = await User.findOne({ email: payload?.email }).select('+password');
// console.log(user);



 if(!user){
    throw new Error("user is not found")
 }

  const userSatatus = user?.userStatus;

  if(userSatatus ==="inactive"){
    throw new Error("user is Inactive")
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )
  if(!isPasswordMatched){
    throw new Error('Wrong password !! Try again')
  }

  //create token and sent to the  client
   const jwtPayload = {
    email: user?.email,
    role : user?.role
   }

   const token  = jwt.sign(jwtPayload , "secrect",{expiresIn:"1d"})
   const veryfiUser = { neme:user?.name , email:user?.email, role:user?.role}

   return {token, veryfiUser};
}


const forgetPasswordIntoDb = async(payload:{email:string})=>{

  const user = await User.findOne({email:payload?.email})

  if(!user){
    throw new Error ('User not found!!')
  }
 
   if(user.userStatus === 'inactive'){
    throw new Error ("User is Blocked !")
   }

   //creat token 
   const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

   const token = jwt.sign(jwtPayload,'secreat',{expiresIn:'1h'})
   
    const resetLink =`http://localhost:5173/reset-password?_id=${user?._id}&token=${token}`
     console.log( resetLink);
     
}



export const AuthServer = {
    regiserIntoDb,
    loginIntoDb,
    forgetPasswordIntoDb
}  