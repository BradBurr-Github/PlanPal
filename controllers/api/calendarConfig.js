const router = require('express').Router();
const express = require('express');
const eventCalendar = require('@nmp/event-calendar');

// Create an Express application
const app = express();

// Configure event calendar
const calendarOptions = {
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm',
  locale: 'en'
};

const calendar = eventCalendar(calendarOptions);

// Example endpoint to get calendar events
router.get('/events', (req, res) => {
  const events = calendar.getEvents();
  res.json(events);
});

// Example endpoint to add a new event
router.post('/events', (req, res) => {
  const newEvent = req.body;
  calendar.addEvent(newEvent);
  res.status(201).json(newEvent);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;