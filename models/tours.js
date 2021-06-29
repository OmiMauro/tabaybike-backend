import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TourSchema = new Schema({
  nameTour: {
    type: String,
    required: [true, 'El nombre del evento es obligatorio']
  },
  travelDate: {
    type: Date,
    default: Date.now()
  },
  distance: [{
    type: String,
    default: '10km'
  }]
}, {
  timestamps: true
})

export default mongoose.model('tour', TourSchema)
