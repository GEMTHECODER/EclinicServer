const Appointment = require("../models/Appointment");
const { Doctor} = require("../models/Doctor");

// const connection = require('../config/mongodb');
// connection();

// doctorId="6467484810afb94c2ca2759c";
// patientId="6469b0f9c325a2bd6322788b",
// // scheduleId="6467484810afb94c2ca2759f";//false
// scheduleId="6467484810afb94c2ca2759f";//true xa, auxa data
// createAppointment("6467484810afb94c2ca2759c","6469b0f9c325a2bd6322788b","6467484810afb94c2ca2759d");

async function createAppointment(doctorId, patientId, scheduleId) {
  
  const doctor = await Doctor.findById(doctorId).exec();
  const schedule = doctor.schedule.id(scheduleId);
  console.log(schedule)
  if (!doctor) {
    throw new Error('Doctor not found');
  }
    if (!schedule) {
    throw new Error('Schedule not found');
    }
    if(!schedule.status)//status = false, doctor availabe xena, cannot create an appointment
    {
      throw new Error('doctor is unavailable for this schedule');
    }
    if(schedule.status) {
      let appointmentStatus=""
      try{
        if(schedule.status)
        { appointmentStatus= `scheduled`}
        
          var b =convertToCurrentDate(  schedule.startTime,"2023-05-25T12:00:00Z") 
          console.log("hello world",b)
        const newAppointment = {
                patientName: "someOne",
                doctorName: doctor.name,
                doctor: doctorId,
                patient: patientId,
                dateTime: b,
                duration:25,
                status: appointmentStatus,
                weekday: getWeekdayNumber(schedule.day),
              };
              
                const createdAppointment = await Appointment.create(newAppointment);
                      //  Update the schedule status // so that, this time is again vacant
                                                
                schedule.status = false;
                const whichdoctor=await doctor.save()
                console.log("asdlkajsdlkasd",createdAppointment)
                return createdAppointment;
            } 
            catch (error) {
                    throw new Error( 'apponitment cannot created',error.message);
                  }
    }
  }

  function getWeekdayNumber(dayName) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDayName = dayName.toLowerCase();
    return days.findIndex(day => day.toLowerCase() === formattedDayName);
  }

  function convertToCurrentDate(starttime, datetime) {
    const [hours, minutes] = starttime.split(':');
    const [time, period] = starttime.split(' ');
  
    let hours24 = parseInt(hours);
    if (period === 'PM' && hours !== '12') {
      hours24 += 12;
    } else if (period === 'AM' && hours === '12') {
      hours24 = 0;
    }
  
    const [datePart] = datetime.split('T');
    const [year, month, day] = datePart.split('-');
    const [hoursPart] = datetime.split('T')[1].split(':');
    
    const date = new Date(year, month - 1, day, hours24, hoursPart);
    return date;
  }


// async function createAppointment(doctorId, patientId, schedule) {
//     try {
//       const doctor = await Doctor.findById(doctorId);
  
//       if (!doctor) {
//         throw new Error('Doctor not found');
//       }

//       const patient = await Patient.findById(patientId);
  
//       if (!patient) {
//         throw new Error('Patient not found');
//       }
  
//       // Find the specific schedule object within the doctor's schedule array
//       const selectedSchedule = doctor.schedule.find((s) => {
//         return (

//           // s.patientId === patientId &&
//           s.id === schedule.scheduleId)
           
      
//       });
//       console.log(selectedSchedule)
  
//       if (!selectedSchedule) {
//         throw new Error('Schedule not found');
//       }
  
//       // return selectedSchedule;


//       var a= calculateDuration(selectedSchedule.startTime, selectedSchedule.endTime);

    
//       console.log("+++++++++++++++++++++++",schedule.dateTime)
//   var b =convertToCurrentDate(  schedule.startTime,schedule.dateTime) 

//     console.log('Hello world'+b);
     

//        // Create the new Appointment object
//     const newAppointment = {
//       patientName: "someOne",
//       doctorName: doctor.name,
//       doctor: doctorId,
//       patient: patientId,
//       dateTime: BarProp,
//       duration:25,
//       status: schedule.status,
//       weekday: getWeekdayNumber(selectedSchedule.day),
//     };
    
//       const createdAppointment = await Appointment.create(newAppointment);
//       console.log("asdlkajsdlkasd",createdAppointment)
//       return createdAppointment;
//     } catch (error) {
//       throw new Error('Error creating appointment: ' + error.message);
//     }
//   }


  
//   function convertToCurrentDate(starttime,datetime) {
//     const currentDate = datetime;
//     const [hours, minutes] = starttime.split(':');
//     const [time, period] = starttime.split(' ');
//     console.log("+++++++++++++++++++",period,"timeuiis",time)
    
//     let hours24 = parseInt(hours);
//     if (period === 'PM' && hours !== '12') {
//       hours24 += 12;
//     } else if (period === 'AM' && hours === '12') {
//       hours24 = 0;
//     }
    
   
// const date = new Date(datetime);

//     date.setHours(hours24, time);
//     return currentDate;
//   }

  
  function calculateDuration(startTime, endTime) {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const durationInMilliseconds = end - start;
    const durationInHours = durationInMilliseconds / 1000 / 60 / 60;
    return durationInHours;
  }
  

  
  
async function getAllAppointments(appointmentId) {
  try {
    const appointment = await Appointment.find();
    return appointment;
    }catch{
              throw new Error('something went wrong upon fetching the appointment');
    }
  }

module.exports = {
  createAppointment,
  getAllAppointments

  // getAllAppointments,
  // getAppointmentById,
  // update,
}