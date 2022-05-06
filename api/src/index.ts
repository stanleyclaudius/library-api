import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db'
import routes from './routes'

dotenv.config({
  path: './src/config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ msg: 'Hello, docker aaa!' })
})
app.use('/api/v1/auth', routes.auth)
app.use('/api/v1/user', routes.user)
app.use('/api/v1/book', routes.book)
app.use('/api/v1/books_borrowed', routes.booksBorrowed)

connectDB()
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))