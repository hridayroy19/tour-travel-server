import nodemailer from 'nodemailer'
import config from '../config'

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hrhridoyroy503@gmail.com',
      pass: config.sendmail_pass,
    },
  })

  await transporter.sendMail({
    from: 'Tour and Travles 😎',
    to,
    subject,
    text: 'Hello world?',
    html,
  })
}

export default sendMail
