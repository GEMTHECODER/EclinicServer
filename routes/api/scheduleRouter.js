// scheduleRouter.js

const express = require('express');
const schedulerouter = express.Router();
const scheduleService = require('../../service/scheduleService');

// Update the day field of a schedule
//remaining

// Get all schedules of a doctor
schedulerouter.get('/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
      const schedules = await scheduleService.getAllSchedules(doctorId);
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific schedule of a doctor
  schedulerouter.get('/:doctorId/:scheduleId', async (req, res) => {
    const { doctorId, scheduleId } = req.params;
    try {
      const schedule = await scheduleService.getScheduleById(doctorId, scheduleId);
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new schedule for a doctor
  schedulerouter.post('/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    const scheduleData = req.body;
    try {
      const newSchedule = await scheduleService.createSchedule(doctorId, scheduleData);
      res.json(newSchedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a specific schedule of a doctor
  schedulerouter.put('/:doctorId/:scheduleId', async (req, res) => {
    const { doctorId, scheduleId } = req.params;
    const updatedData = req.body;
    try {
      const updatedSchedule = await scheduleService.updateSchedule(doctorId, scheduleId, updatedData);
      res.json(updatedSchedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a specific schedule of a doctor
  schedulerouter.delete('/:doctorId/:scheduleId', async (req, res) => {
    const { doctorId, scheduleId } = req.params;
    try {
      await scheduleService.deleteSchedule(doctorId, scheduleId);
      res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = schedulerouter;
