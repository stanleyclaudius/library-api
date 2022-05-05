import express from 'express'
import bookCtrl from './../controllers/bookCtrl'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(bookCtrl.getAllBooks)
  .post(isAuthenticated, authorizeRoles('admin'), bookCtrl.createBook)

router.route('/search').get(bookCtrl.searchBook)

router.route('/:id')
  .get(bookCtrl.getBookById)
  .patch(isAuthenticated, authorizeRoles('admin'), bookCtrl.updateBook)
  .delete(isAuthenticated, authorizeRoles('admin'), bookCtrl.deleteBook)

export default router