import mongoose from 'mongoose'

const booksBorrowedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: 'book',
    required: true
  },
  date_borrowed: {
    type: Date,
    required: true
  },
  date_returned: {
    type: Date,
    default: ''
  }
}, {
  timestamps: true
})

const BooksBorrowed = mongoose.models.booksBorrowed || mongoose.model('booksBorrowed', booksBorrowedSchema)
export default BooksBorrowed