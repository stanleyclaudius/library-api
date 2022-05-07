import { Response } from 'express'
import { IReqUser } from './../utils/Interface'
import BooksBorrowed from './../models/BooksBorrowed'
import Book from './../models/Book'

const booksBorrowedCtrl = {
  borrowBook: async(req: IReqUser, res: Response) => {
    try {
      const { book_id } = req.body
      if (!book_id)
        return res.status(400).json({ msg: 'Please provie book to be borrowed.' })
        
      const book = await Book.findById(book_id)
      if (!book)
        return res.status(404).json({ msg: `Book with ID ${book_id} not found.` })

      const bookQty = book.qty
      if (bookQty === 0)
        return res.status(400).json({ msg: `Book with ID ${book_id} currently ran out of stock.` })

      const newBorrowed = new BooksBorrowed({
        user: req.user?._id,
        book: book_id,
        date_borrowed: new Date()
      })
      await newBorrowed.save()

      await Book.findOneAndUpdate({ _id: book_id }, {
        qty: bookQty - 1
      })

      return res.status(200).json({
        msg: `Books with ID ${book_id} has been borrowed successfully by ${req.user?.name}`,
        books_borrowed: newBorrowed
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  returnBook: async(req: IReqUser, res: Response) => {
    try {
      const { borrowed_id } = req.body
      if (!borrowed_id)
        return res.status(400).json({ msg: 'Please provide borrowed id to return book.' })

      const findBorrowedBook = await BooksBorrowed.findOne({ _id: borrowed_id, user: req.user?._id, date_returned: '' })
      if (!findBorrowedBook)
        return res.status(404).json({ msg: `Provided borrowed ID not valid.` })

      await BooksBorrowed.findOneAndUpdate({ _id: borrowed_id }, {
        date_returned: new Date()
      })

      const bookId = findBorrowedBook.book
      const book = await Book.findById(bookId)

      await Book.findOneAndUpdate({ _id: bookId }, {
        qty: book.qty + 1
      })

      return res.status(200).json({ msg: 'Book has been returned successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getBorrowedBooksByUser: async(req: IReqUser, res: Response) => {
    try {
      const borrowedBooks = await BooksBorrowed.find({ user: req.user?._id }).populate('book').populate('user', 'name dob gender avatar email').sort('-createdAt')
      return res.status(200).json({ borrowedBooks })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getReturnedBooksByUser: async(req: IReqUser, res: Response) => {
    try {
      const returnedBooks = await BooksBorrowed.find({ user: req.user?._id, date_returned: { $ne: '' } }).populate('book').populate('user', 'name dob gender avatar email').sort('-createdAt')
      return res.status(200).json({ returnedBooks })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default booksBorrowedCtrl