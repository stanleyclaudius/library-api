import { Response, NextFunction } from 'express'
import { IDecodedToken, IReqUser } from './../utils/Interface'
import jwt from 'jsonwebtoken'
import User from './../models/User'

export const isAuthenticated = async(req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    if (!decoded.id)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const user = await User.findById(decoded.id)
    if (!user)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    req.user = user
    next()
  } catch (err: any) {
    return res.status(500).json({ msg: err.message })
  }
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: IReqUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role))
      return res.status(403).json({ msg: `User with role ${req.user?.role} can't access this resource.` })

    next()
  }
}