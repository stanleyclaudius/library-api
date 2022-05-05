import { Request, Response } from 'express'
import { checkEmail } from './../utils/validator'
import { IDecodedToken } from './../utils/Interface'
import { generateAccessToken, generateRefreshToken } from './../utils/generateToken'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './../models/User'

const authCtrl = {
  register: async(req: Request, res: Response) => {
    try {
      const { name, dob, gender, email, password } = req.body
      if (!name || !dob || !gender || !email || !password)
        return res.status(400).json({ msg: 'Please provide every field in form to register.' })

      const diffTime = Math.abs(Number(new Date(dob)) - Number(new Date()))
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (new Date(dob).toISOString() > new Date().toISOString())
        return res.status(400).json({ msg: 'DOB can\'t be greater than current date.' })

      if (diffDays < 3650)
        return res.status(400).json({ msg: 'You should at least be a 3rd grader to register.' })

      if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female')
        return res.status(400).json({ msg: 'Gender should be either male or female.' })

      if (!checkEmail(email))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      if (password.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

      const findUser = await User.findOne({ email })
      if (findUser)
        return res.status(400).json({ msg: 'Email has been registered before.' })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = new User({
        name,
        dob,
        gender,
        email,
        password: passwordHash
      })
      await newUser.save()

      return res.status(200).json({ msg: 'User has been successfully registered.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (!email || !password)
        return res.status(400).json({ msg: 'Please provide email and password to login.' })

      if (!checkEmail(email))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      const user = await User.findOne({ email })
      if (!user) 
        return res.status(404).json({ msg: 'Invalid credential.' })

      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch)
        return res.status(404).json({ msg: 'Invalid credential.' })

      const accessToken = generateAccessToken({ id: user._id })
      generateRefreshToken({ id: user._id }, res)

      return res.status(200).json({
        msg: `Authenticated as ${user.name}`,
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  refreshToken: async(req: Request, res: Response) => {
    try {
      const { libraryapi_rfToken: token } = req.cookies
      if (!token)
        return res.status(401).json({ msg: 'Invalid authentication.' })
        
      const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id)
        return res.status(401).json({ msg: 'Invalid authentication.' })

      const user = await User.findById(decoded.id)
      if (!user)
        return res.status(401).json({ msg: 'Invalid authentication.' })

      const accessToken = generateAccessToken({ id: user._id })
      generateRefreshToken({ id: user._id }, res)

      return res.status(200).json({
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async(req: Request, res: Response) => {
    try {
      res.clearCookie('libraryapi_rfToken', {
        path: '/api/v1/auth/refresh_token'
      })

      return res.status(200).json({ msg: 'Logout success.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default authCtrl