import { Request } from 'express'

export interface IUser {
  _id: string
  name: string
  dob: string
  gender: string
  role: string
  email: string
  avatar: string
  password: string
}

export interface IDecodedToken {
  id: string
}

export interface IReqUser extends Request {
  user?: IUser
}