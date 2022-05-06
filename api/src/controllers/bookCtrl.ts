import { Request, Response } from 'express'
import APIFeatures from '../utils/APIFeatures'
import Book from './../models/Book'

const bookCtrl = {
  getAllBooks: async(req: Request, res: Response) => {
    try {
      const features = new APIFeatures(Book.find(), req.query).paginate().sort()

      const result = await Promise.allSettled([
        features.query,
        Book.countDocuments()
      ])
      
      const books = result[0].status === 'fulfilled' ? result[0].value : []
      const total = result[1].status === 'fulfilled' ? result[1].value : 0

      return res.status(200).json({ books, total })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getBookById: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const book = await Book.findById(id)
      if (!book)
        return res.status(404).json({ msg: `Book with ID ${id} not found.` })

      return res.status(200).json({ book })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  searchBook: async(req: Request, res: Response) => {
    try {
      const { keyword } = req.query

      let books;

      if (keyword) {
        books = await Book.aggregate([
          {
            $search: {
              'index': 'book',
              'text': {
                'path': ['title', 'category', 'author', 'publisher'],
                'query': req.query.keyword
              }
            }
          }
        ])
      } else {
        books = []
      }

      return res.status(200).json({ books })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createBook: async(req: Request, res: Response) => {
    try {
      const {
        title,
        description,
        author,
        publisher,
        date_published,
        total_page,
        isbn,
        qty,
        category,
        images
      } = req.body

      if (
        !title ||
        !description ||
        !author ||
        !publisher ||
        !date_published ||
        !total_page ||
        !isbn ||
        !qty ||
        category.length === 0 ||
        images.length === 0 
      )
        return res.status(400).json({ msg: 'Please provide every field in form to create book.' })

      if (new Date(date_published).toISOString() > new Date().toISOString())
        return res.status(400).json({ msg: 'Date published can\'t be greater than current date.' })

      const newBook = new Book({
        title,
        description,
        author,
        publisher,
        date_published,
        total_page,
        isbn,
        qty,
        category,
        images
      })
      await newBook.save()

      return res.status(200).json({
        msg: `Book with title ${title} has been created successfully.`,
        book: newBook
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateBook: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const {
        title,
        description,
        author,
        publisher,
        date_published,
        total_page,
        isbn,
        qty,
        category,
        images
      } = req.body

      if (date_published) {
        if (new Date(date_published).toISOString() > new Date().toISOString())
          return res.status(400).json({ msg: 'Date published can\'t be greater than current date.' })
      }

      const book = await Book.findById(id)
      if (!book)
        return res.status(404).json({ msg: `Book with ID ${id} not found.` })

      const updatedBook = await Book.findOneAndUpdate({ _id: id }, {
        title: title || book.title,
        description: description || book.description,
        author: author || book.author,
        publisher: publisher || book.publisher,
        date_published: date_published || book.date_published,
        total_page: total_page || book.totalPage,
        isbn: isbn || book.isbn,
        qty: qty || book.qty,
        category: category || book.category,
        images: images || book.images
      }, { new: true })

      return res.status(200).json({
        msg: `Book with ID ${id} has been updated successfully.`,
        book: updatedBook
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteBook: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const book = await Book.findOneAndDelete({ _id: id })
      if (!book)
        return res.status(404).json({ msg: `Book with ID ${id} not found.` })

      return res.status(200).json({ msg: `Book with ID ${id} has been deleted successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default bookCtrl