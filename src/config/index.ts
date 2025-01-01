import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  becript_solt_ront: process.env.BCRYPT_SALT_ROUNDS,
  sendmail_pass: process.env.sendMail_pass,
  cloud_name:process.env.Cloudinary_cloud_name,
  cloud_api_key:process.env.Cloudinary_api_key,
  cloud_api_secret:process.env.Cloudinary_api_secret
}
