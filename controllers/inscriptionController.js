import Inscription from '../models/inscription.js'
import { check, validationResult } from 'express-validator'

const countInscription = async (req, res) => {
  try {
    const listInscriptions = await Inscription.find().countDocuments()
    res.status(200).send({ listInscriptions })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}
const countAlmuerzo = async (req, res) => {
  try {
    const countTrue = await Inscription.find({ almuerzo: 1 }).countDocuments()
    const countFalse = await Inscription.find({ almuerzo: 0 }).countDocuments()
    res.status(200).send({ almuerzan: countTrue, noAlmuerzan: countFalse })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}
const getInscriptions = async (req, res) => {
  try {
    const listInscriptions = await Inscription.find().sort({ lastname: 1, provinceOrigin: 1 }).select({ _id: 0 }).lean().exec()
    res.status(200).send({ listInscriptions })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}
const addInscription = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors }) // if client get any error the code will pass here you can do anything according to your choice
    }
    const { name, lastname, email, numberCell, provinceOrigin, locationOrigin, distanceTour, DNI } = req.body
    const newInscription = new Inscription({
      name,
      lastname,
      email,
      numberCell,
      provinceOrigin,
      locationOrigin,
      distanceTour,
      DNI
    })
    const savedInscription = await newInscription.save()
    res.status(201).json({ messageInscription: 'Su inscripcion fue registrada con exito! Te esperamos!', savedInscription })
    // res.status(200).json({ messageInscription: 'Su inscripcion fue registrada con exito! Te esperamos!', savedInscription })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}
const deleteInscriptions = async (req, res) => {
  try {
    const response = await Inscription.deleteMany()
    res.status(201).json({ response })
  } catch (e) {
    res.status(501).json({ message: e.message })
  }
}

export { getInscriptions, addInscription, countInscription, deleteInscriptions, countAlmuerzo }
