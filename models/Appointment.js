const mongoose = require('mongoose');



const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled',
    required: true,
  },
  weekday: {
    type: Number,
    required: true,
  },
});
 
appointmentSchema.methods.isValid= function() {
  const currentDate = new Date();
  return this.dateTime > currentDate;
};


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;