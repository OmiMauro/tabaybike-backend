import express from 'express'
import { check } from 'express-validator'
import { getInscriptions, addInscription, countInscription, countAlmuerzo } from '../../controllers/inscriptionController.js'
import generarPDFInscripcion from '../../controllers/reportesController.js'
const inscriptionRouter = express.Router()

inscriptionRouter.get('/', getInscriptions)
inscriptionRouter.post('/', [
  check('name', 'Deberia ser un nombre').notEmpty().trim().escape().toUpperCase(),
  check('lastname', 'Deberia ser un apellido').notEmpty().trim().escape().toUpperCase(),
  // check('numberCell', 'Deberia ser un numero telefono/celular').trim().escape(),
  check('DNI', 'Deberia ser un DNI sin puntos ni espacios').notEmpty().trim().isLength({ min: 7, max: 9 }).blacklist('.')
  // check('provinceOrigin', 'Deberia ser una Provincia').trim().escape(),
  // check('locationOrigin', 'Deberia ser una Localidad').trim().escape(),
  // check('distanceTour', 'Deberia ser un recorrido').notEmpty().trim().escape(),
  // check('email', 'Deberia ser un email').isEmail()
], addInscription)
inscriptionRouter.get('/length', countInscription)
inscriptionRouter.get('/almuerzo', countAlmuerzo)
// inscriptionRouter.delete('/delete', deleteInscriptions)

inscriptionRouter.get('/pdf', generarPDFInscripcion)
export default inscriptionRouter
