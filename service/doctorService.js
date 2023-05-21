const {Doctor,Schedule} = require('../models/Doctor');


// Get all schedules of a doctor
async function getSchedules(doctorId) {
        try {
          const doctor = await Doctor.findById(doctorId);
    
          if (!doctor) {
            throw new Error('Doctor not found');
          }
    
          const schedules = doctor.schedule;
    
          return schedules;
        } catch (error) {
          throw new Error(`Failed to get schedules: ${error.message}`);
        }
      }
    
// Get all doctors
async function getAllDoctors() {
  const doctors = await Doctor.find();
  return doctors;
}

// Create a new doctor
async function createDoctor(doctorData) {
  const doctor = new Doctor(doctorData);
  await doctor.validate(); // Validate the doctor data before saving
  await doctor.save();
  return doctor;
}

// Get a doctor by ID
async function getDoctorById(id) {
  const doctor = await Doctor.findById(id);
  return doctor;
}

// Update a doctor by ID
async function updateDoctor(id, doctorData) {
  const doctor = await Doctor.findByIdAndUpdate(id, doctorData, { new: true });
  return doctor;
}

// Delete a doctor by ID
async function deleteDoctor(id) {
  const doctor = await Doctor.findByIdAndDelete(id);
  return doctor;
}

    // ...
    async function createSchedule(doctorId, scheduleData) {
      try {
        const doctor = await Doctor.findById(doctorId);
  
        if (!doctor) {
          throw new Error('Doctor not found');
        }
  
        const newSchedule = {
          day: scheduleData.day,
          startTime: scheduleData.startTime,
          endTime: scheduleData.endTime,
          status: scheduleData.status,
          patientId: scheduleData.patientId,
        };
  
        doctor.schedule.push(newSchedule);
  
        await doctor.save();
  
        return newSchedule;
      } catch (error) {
        throw new Error(`Failed to create schedule: ${error.message}`);
      }
    }

    async function updateSchedule(doctorId, scheduleId, scheduleData) {
        try {
          const doctor = await Doctor.findById(doctorId);
    
          if (!doctor) {
            throw new Error('Doctor not found');
          }
    
          const schedule = doctor.schedule.id(scheduleId);
    
          if (!schedule) {
            throw new Error('Schedule not found');
          }
    
          schedule.day = scheduleData.day;
          schedule.startTime = scheduleData.startTime;
          schedule.endTime = scheduleData.endTime;
          schedule.status = scheduleData.status;
          schedule.patientId = scheduleData.patientId;
    
          await doctor.save();
    
          return schedule;
        } catch (error) {
          throw new Error(`Failed to update schedule: ${error.message}`);
        }
      }
  



module.exports = {
  getAllDoctors,
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getSchedules,
  createSchedule,
  updateSchedule
  
};
