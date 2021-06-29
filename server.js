import App from './routes/App.js'
import dotenv from 'dotenv/config'
import connectDB from './database/connectDB.js'
const uri = process.env.MONGO_URI
console.log(uri)
const initApp = async (uri) => {
  try {
    await connectDB(uri)
    App.listen(process.env.PORT, () => console.log(`running in ${process.env.PORT}`))
  } catch (e) {
    console.log(e)
    process.exit(0)
  }
}

initApp(uri)
