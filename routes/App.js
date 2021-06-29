import express from 'express'
import createHttpError from 'http-errors'
import cors from 'cors'
// Routes of application
import inscriptionRouter from './inscription/inscriptionRouter.js'

const App = express()

App.use(express.json())
App.use(express.urlencoded({ extended: false }))
App.use(cors())
App.use('/inscription', inscriptionRouter)
App.use(express.static('build'))

App.use((req, res, next) => next(createHttpError(404)))
export default App
