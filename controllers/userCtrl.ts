import { Response } from 'express'
import { IReqUser } from './../utils/Interface'
import bcrypt from 'bcrypt'
import User from './../models/User'

const userCtrl = {
  changePassword: async(req: IReqUser, res: Response) => {
    try {
      const { currPassword, newPassword } = req.body
      if (!currPassword || !newPassword)
        return res.status(400).json({ msg: 'Please provide every field in form to change password.' })

      const user = await User.findById(req.user?._id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      const isCurrPasswordMatch = await bcrypt.compare(currPassword, user.password)
      if (!isCurrPasswordMatch)
        return res.status(400).json({ msg: 'Current password doesn\'t match.' })

      if (newPassword.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

      const passwordHash = await bcrypt.hash(newPassword, 12)
      
      await User.findOneAndUpdate({ _id: req.user?._id }, { password: passwordHash })

      return res.status(200).json({ msg: 'Password has been changed successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  editProfile: async(req: IReqUser, res: Response) => {
    try {
      const { name, avatar } = req.body
      if (!name)
        return res.status(400).json({ msg: 'Please provide your name.' })

      const user = await User.findOneAndUpdate({ _id: req.user?._id }, {
        name, avatar
      }, { new: true })

      return res.status(200).json({
        msg: 'Profile has been updated successfully.',
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message})
    }
  }
}

export default userCtrl