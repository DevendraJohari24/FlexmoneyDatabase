const mongoose = require('mongoose')
const PlanSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true},
  email: { type: String, required: true,  unique: true },
  phoneNumber: {type: String, required: true, unique: true},
  gender: { type: String, required: true },
  schedule: { type: String, required: true },
  level: {type: String, required: true },
  session: { type: String, required: true },
  paymentId: {type: String, required: true},
  paymentDate: {type: Date, required: true},
});


const Plans = mongoose.model('Plans', PlanSchema)

module.exports = Plans;