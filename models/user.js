import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

UserSchema.plugin(uniqueValidator)
const User = mongoose.model('User', UserSchema)
export default User
