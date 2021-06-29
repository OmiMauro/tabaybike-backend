import mongoose from 'mongoose'

mongoose.connection.on('open', () => console.log('Succesfuly connect DB. '))
const connectDB = async (uri) => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

export default connectDB
