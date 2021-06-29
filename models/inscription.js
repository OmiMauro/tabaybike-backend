import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const inscriptionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true
  },
  DNI: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/]
  },
  numberCell: {
    type: String,

    trim: true
  },
  provinceOrigin: {
    type: String,
    trim: true
  },
  locationOrigin: {
    type: String,
    default: 'Other',
    trim: true
  },
  distanceTour: {
    type: String,
    required: [true, 'El recorrido a realizar es obligatorio']
  }
}, {
  timestamps: true
})

inscriptionSchema.plugin(uniqueValidator)
const Inscription = mongoose.model('Inscriptions', inscriptionSchema)
export default Inscription
