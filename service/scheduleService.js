// scheduleService.js

const {Doctor,Schedule} = require('../models/Doctor');

//since schedle is embedded in doctor, we can't make query by findById() using Id of shedules only
// we need the doctor, whose shedule we are updating, 
//so this function is not possible


// const updateScheduleDay = async (scheduleId, day) => {
//     try {
//       const schedule = await Schedule.findById(scheduleId);
      
//       if (!schedule) {
//         throw new Error('Schedule not found');
//       }
  
//       schedule.day = day;
//       await schedule.save();
  
//       return schedule;
//     } catch (error) {
//       throw new Error('Failed to update schedule: ' + error.message);
//     }
//   };



// Get all schedules of a doctor
async function getAllSchedules(doctorId) {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor.schedule;
  } catch (error) {
    throw new Error('Failed to get schedules: ' + error.message);
  }
}

// Get a specific schedule of a doctor
async function getScheduleById(doctorId, scheduleId) {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    const schedule = doctor.schedule.id(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }
    return schedule;
  } catch (error) {
    throw new Error('Failed to get schedule: ' + error.message);
  }
}

// Create a new schedule for a doctor
async function createSchedule(doctorId, scheduleData) {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    doctor.schedule.push(scheduleData);
    await doctor.save();
    return doctor.schedule[doctor.schedule.length - 1]; // Return the newly created schedule
  } catch (error) {
    throw new Error('Failed to create schedule: ' + error.message);
  }
}

// Update a specific schedule of a doctor
async function updateSchedule(doctorId, scheduleId, updatedData) {
  try {
    console.log("helo world"+doctorId);
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    const schedule = doctor.schedule.id(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }
    Object.assign(schedule, updatedData); // Update the properties of the schedule
    await doctor.save();
    return schedule;
  } catch (error) {
    throw new Error('Failed to update schedule: ' + error.message);
  }
}

async function deleteSchedule(doctorId, scheduleId) {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const schedule = doctor.schedule.id(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    // schedule.remove();
    doctor.schedule.pull(schedule);
    await doctor.save();
    return schedule;
  } catch (error) {
    throw new Error(`Failed to delete schedule: ${error.message}`);
  }
}

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
