import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '7d' })
}

export const generateRefreshToken = (payload: object, res: Response) => {
  const rfToken = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })

  res.cookie('libraryapi_rfToken', rfToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })

  return rfToken
}