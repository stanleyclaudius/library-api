import express from 'express'
import booksBorrowedCtrl from './../controllers/booksBorrowedCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/borrow')
  .get(isAuthenticated, booksBorrowedCtrl.getBorrowedBooksByUser)
  .post(isAuthenticated, booksBorrowedCtrl.borrowBook)

router.route('/return')
  .get(isAuthenticated, booksBorrowedCtrl.getReturnedBooksByUser)
  .post(isAuthenticated, booksBorrowedCtrl.returnBook)

export default router