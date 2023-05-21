// scheduleRouter.js

const express = require('express');
const patientrouter = express.Router();
const patientService = require('../../service/patientService');

//creating crud operations for Patient only
// Create a Patient
patientrouter.post('/', async (req, res) => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Patients
patientrouter.get('/', async (req, res) => {
  try {
    const patients = await patientService.getPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a Patient by ID
patientrouter.get('/:id', async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Patient
patientrouter.put('/:id', async (req, res) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    console.log("here ",req.body)
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Patient
patientrouter.delete('/:id', async (req, res) => {
  try {
    const patient = await patientService.deletePatient(req.params.id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json({ message: 'Patient deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//++++++++++++++++start  of  patient operations with updated doctors info+++++++++++++++++?????????????????///////
// all the operations are related to patient update.
// on creation of patient, doctors are supposed to be empty as well.




// Update a Patient with doctor
patientrouter.put('/addDoctors/', async (req, res) => {
    console.log("helloworld")
    // try {
    //   const patient = await patientService.addDoctorToPatient(req.params.id, req.body);
    //   if (!patient) {
    //     res.status(404).json({ error: 'Patient not found' });
    //   } else {
    //     res.json(patient);
    //   }
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
  });


  // Update a Patient with doctor



// Route to add a doctor to a patient
patientrouter.put('/patient/:id/:doctorId', async (req, res) => {
    // const { patientId, doctorId } = req.params;very bad apprach
    console.log("checkhere",);
    try {
      const updatedPatient = await patientService.addDoctorToPatient123(req.params.id,req.params.doctorId);
      res.json(updatedPatient);
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ error: 'Failed to update patient' });
    }
  });

// Get doctors of a patient {{patientId}}

  patientrouter.get('/:id/doctors', async (req, res) => {
    // getting names of doctor
    // const doctor = await patientService.getDoctorsOfPatients( req.params.id).then(x=>x.doctors.forEach(x=>console.log(x.name)))
    try {
    const doctor = await patientService.getDoctorsOfPatients( req.params.id).then(x=>x.doctors.forEach(x=>console.log(x.name)))
    console.log("hellodoc",doctor)
    res.status(600).json(doctor);
    } catch (error) {
        console.error('Unable to fetch patient doctors:', error);
        res.status(500).json({ error: 'Unable to fetch patient doctors' });
      }
  });
  

  




//++++++++++++++++{{{{{{{{{{{{{{{{{end of basic patient operations}}}}}}+++++++++++++++++?????????????????///////



module.exports = patientrouter;
