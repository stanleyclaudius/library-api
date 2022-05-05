import mongoose from 'mongoose'

const connectDB = async() => {
  await mongoose.connect(`${process.env.MONGODB_URI}`, err => {
    if (err) throw err
    console.log('Connected to MongoDB successfully.')
  })
}

export default connectDB