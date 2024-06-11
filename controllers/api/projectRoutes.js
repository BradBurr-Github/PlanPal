// const express = require('express');
// const Calendar = require('@nmp/event-calendar');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// const calendarOptions = {
//   timezone: 'UTC',
//   dateFormat: 'YYYY-MM-DD',
//   timeFormat: 'HH:mm',
//   locale: 'en'
// };

// const calendar = eventCalendar(calendarOptions);

// // Get all events
// app.get('/events', (req, res) => {
//   try {
//     const events = calendar.getEvents();
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add a new event
// app.post('/events', (req, res) => {
//   try {
//     const newEvent = req.body;
//     calendar.addEvent(newEvent);
//     res.status(201).json(newEvent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Update an event
// app.put('/events/:id', (req, res) => {
//   try {
//     const updatedEvent = { ...req.body, id: req.params.id };
//     calendar.updateEvent(updatedEvent);
//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete an event
// app.delete('/events/:id', (req, res) => {
//   try {
//     calendar.deleteEvent(req.params.id);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = router;
