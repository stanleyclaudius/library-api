import express from 'express'
import userCtrl from './../controllers/userCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/change_password').patch(isAuthenticated, userCtrl.changePassword)
router.route('/edit_profile').patch(isAuthenticated, userCtrl.editProfile)

export default router