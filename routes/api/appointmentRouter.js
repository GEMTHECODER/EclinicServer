
 const express = require('express');
const appointmentService = require('../../service/appointmentService');
 const appointmentrouter = express.Router();
 
 // Create an appointment
 appointmentrouter.post('/', async (req, res) => {
   try {
    const {patientId, doctorId, schedules} = req.body;
    console.log("this is patient",patientId,"this is doctor", doctorId,"this is schedule", schedules)
     const appointment = await appointmentService.createAppointment(doctorId, patientId, schedules);
     res.json(appointment);
   } catch (error) {
     console.error('Error creating appointment:', error);
     res.status(500).json({ error: 'Failed to create appointment' });
   }
 });
 
 
//  // Get all appointments
//  router.get('/', async (req, res) => {
//    try {
//      const appointments = await appointmentService.getAllAppointments();
//      res.json(appointments);
//    } catch (error) {
//      console.error('Error getting appointments:', error);
//      res.status(500).json({ error: 'Failed to get appointments' });
//    }
//  });
 
//  // Get an appointment by ID
//  router.get('/:id', async (req, res) => {
//    try {
//      const appointment = await appointmentService.getAppointmentById(req.params.id);
//      res.json(appointment);
//    } catch (error) {
//      console.error('Error getting appointment:', error);
//      res.status(500).json({ error: 'Failed to get appointment' });
//    }
//  });
 
//  // Update an appointment by ID
//  router.put('/:id', async (req, res) => {
//    try {
//      const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
//      res.json(appointment);
//    } catch (error) {
//      console.error('Error updating appointment:', error);
//      res.status(500).json({ error: 'Failed to update appointment' });
//    }
//  });
 
//  // Delete an appointment by ID
//  router.delete('/:id', async (req, res) => {
//    try {
//      await appointmentService.deleteAppointment(req.params.id);
//      res.json({ message: 'Appointment deleted successfully' });
//    } catch (error) {
//      console.error('Error deleting appointment:', error);
//      res.status(500).json({ error: 'Failed to delete appointment' });
//    }
//  });
 
 
 module.exports = appointmentrouter;