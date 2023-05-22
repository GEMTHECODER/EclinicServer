const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,//doctor 
  },
 
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});


const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: String,
  email: String,
  gender: String,
  profileImage: String,
  experience: String,
  description: String,
  specialization: String,
  schedule: [scheduleSchema],
});

const Doctor = mongoose.model('Doctor', doctorSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);


module.exports = {
  Doctor,
  Schedule,
};