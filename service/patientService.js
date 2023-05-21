const { Doctor } = require("../models/Doctor");
const Patient = require("../models/Patient");



//++++++++++++++++++++==basic crud operations of patient++++++++++++++++++++++++++++++++++++++//  
async function createPatient(patientData) {
    try {
      const patient = await Patient.create(patientData);
      console.log('Patient created:', patient);
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
   
    }
  }

  
// Delete a patient by ID
async function deletePatient(patientId) {
    try {
      const deletedPatient = await Patient.findByIdAndRemove(patientId);
      if (!deletedPatient) {
        throw new Error('Patient not found');
      }
      return deletedPatient;
    } catch (error) {
      throw new Error(`Failed to delete patient: ${error.message}`);
    }
  }
  

// Update a patient by ID
async function updatePatient(patientId, updatedData) {
    try {
      const patient = await Patient.findByIdAndUpdate(patientId, updatedData, {
        new: true,
      });
      return patient;
    } catch (error) {
      throw new Error('Unable to update patient');
    }
  }
  
  // Get all patients
  function getPatients() {
  
    return Patient.find().populate('doctors')
  }

  // Get patient by ID
async function getPatientById(patientId) {
    try {
      const patient = await Patient.findById(patientId).populate('doctors');
      if (!patient) {
        throw new Error('Patient not found');
      }
      return patient;
    } catch (error) {
      throw new Error(`Failed to get patient: ${error.message}`);
    }
  }
//++++++++++++++++++++==basic crud operations of patient++++++++++++++++++++++++++++++++++++++//  


//++++++++++++++++++++==nested crud operations of patient++++++++++++++++++++++++++++++++++++++//  
//patient can access full table of doctor,



// async function  addDoctorToPatient(patientId,doctorId) {

//     // Find the doctor by ID
//     // const doctorId = 'your-doctor-id'; // Replace with the actual doctor ID
    
//     Doctor.findById(doctorId).then((doctor) => {
//         if (!doctor) {
//           throw new Error('Doctor not found');
//         }
    
//         // Update the patient's doctors array with the doctor's ID
//         Patient.findById(patientId).then( (patient) => {
//         if (!patient) {
//           throw new Error('Patient not found');
//         }
//         patient.doctors.push(doctor._id);
    
//         // Save the updated patient to the database
//         return patient.save();
//       })
//       .then((patient) => {
//         console.log('Updated Patient:', patient);
//       })
//       .catch((error) => {
//         console.error('Error updating patient:', error);
//       });
    
//     })
//     }


  
  
async function addDoctorToPatient123(patientId, doctorId) {
    try {
      console.log('Patient ID:', patientId);
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
  
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new Error('Patient not found');
      }
  
      patient.doctors.push(doctor._id);
      const updatedPatient = await patient.save();
      console.log('Updated Patient:', updatedPatient);
      return updatedPatient;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error('Failed to update patient');
    }
  }
  

// get all doctor of the patient
  async function  getDoctorsOfPatients(patientId){
    try{
    console.log(patientId)
 return await Patient.findById(patientId).populate('doctors').exec()
    
  }catch{
    throw new Error('Unable to fetch patient doctors');
  }

  }

  
  

//++++++++++++++++++++==nested crud operations of patient++++++++++++++++++++++++++++++++++++++//  


module.exports = {
    createPatient,
    deletePatient,
    updatePatient,
    getPatients,
    getPatientById,
    addDoctorToPatient123,
    getDoctorsOfPatients
    // updatePatient,
    // createPatientWithDoctorArray,
    // getDoctorsOfPatients,
    // // updatePatientDoctor,
    // updatePatientDoctorName,
    // updatePatientDoctorLocally,
    // getDoctorsOfPatientsInItsArray,
    // getPatients
  };
  