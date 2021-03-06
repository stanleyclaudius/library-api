import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db'
import routes from './routes'
import path from 'path'

dotenv.config({
  path: './config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: '*',
  credentials: true
}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', routes.auth)
app.use('/api/v1/user', routes.user)
app.use('/api/v1/book', routes.book)
app.use('/api/v1/books_borrowed', routes.booksBorrowed)

app.use(express.static('view'))
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../view', 'html', 'index.html'))
  } else {
    res.sendFile(path.join(__dirname, 'view', 'html', 'index.html'))
  }
})

connectDB()
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))