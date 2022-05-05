import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  date_published: {
    type: String,
    required: true
  },
  total_page: {
    type: Number,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  category: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

const Book = mongoose.models.book || mongoose.model('book', bookSchema)
export default Book