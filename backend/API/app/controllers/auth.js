import { verify } from 'jsonwebtoken'
require('dotenv').config()

//format like bearer 21321n2bmbbj

export const isAuth = ({ context }, next) => {
  const authorization = context.req.headers['authorization']

  if (!authorization) {
    throw new Error('Not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, process.env.JWT_SECRET)
    console.log(payload)
    context.payload = payload
  } catch (err) {
    console.log(err)
    throw new Error('Not authenticated')
  }
  return next()
}
