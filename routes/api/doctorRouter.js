const express = require('express');
// const Doctor = require('../../models/Doctor'); // before with only one import 
const { Doctor, Schedule } = require('../../models/Doctor');

const connection = require('../../config/mongodb');
const doctorService = require('../../service/doctorService');
const doctorrouter = express.Router();

connection();


// const a=Doctor.find().then(x=>console.log("this is what this is",x)).catch(e=>console.error(e))
// console.log("this is a ",a)


// Load Book model
// const Book = require('../../models/Books');

// // @route GET api/books/test
// // @description tests books route
// // @access Public
doctorrouter.get('/test', (req, res) => res.send('book route testing!'));


// Get all doctors
doctorrouter.get('/', async (req, res, next) => {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    } catch (err) {
      next(err);
    }
  });
  
  // Create a new doctor
  doctorrouter.post('/', async (req, res, next) => {
    try {
      const doctor = await doctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (err) {
      next(err);
    }
  });
  
  // Get a doctor by ID
  doctorrouter.get('/:id', async (req, res, next) => {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (err) {
      next(err);
    }
  });
  
  // Update a doctor by ID
  doctorrouter.put('/:id', async (req, res, next) => {
    try {
      const doctor = await doctorService.updateDoctor(req.params.id, req.body);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (err) {
      next(err);
    }
  });
  
  // Delete a doctor by ID
  doctorrouter.delete('/:id', async (req, res, next) => {
    try {
      const doctor = await doctorService.deleteDoctor(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

 

  
// // Get schedules
// doctorrouter.get('/:doctorId/schedule', async (req, res) => {
//     try {
//       const { doctorId } = req.params;
  
//       const schedules = await doctorService.getSchedules(doctorId);
  
//       res.json(schedules);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


  
// // Update a schedule
// doctorrouter.put('/:doctorId/schedule/:scheduleId', async (req, res) => {
//     try {
//       const { doctorId, scheduleId } = req.params;
//       const scheduleData = req.body;
  
//       const updatedSchedule = await doctorService.updateSchedule(doctorId, scheduleId, scheduleData);
  
//       res.json(updatedSchedule);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Create a schedule
// doctorrouter.post('/:doctorId/schedule', async (req, res) => {
//     try {
//       const { doctorId } = req.params;
//       const scheduleData = req.body;
  
//       const newSchedule = await doctorService.createSchedule(doctorId, scheduleData);
  
//       res.json(newSchedule);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

  // Update the day field of a schedule
doctorrouter.put('/:id/day', async (req, res) => {
    try {
      const { id } = req.params;
      const { day } = req.body;
  
      const updatedSchedule = await scheduleService.updateScheduleDay(id, day);
  
      res.json(updatedSchedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = doctorrouter;