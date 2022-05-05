import express from 'express'
import authCtrl from './../controllers/authCtrl'

const router = express.Router()

router.route('/login').post(authCtrl.login)
router.route('/register').post(authCtrl.register)
router.route('/refresh_token').get(authCtrl.refreshToken)
router.route('/logout').get(authCtrl.logout)

export default router