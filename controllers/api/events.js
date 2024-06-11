// Assuming calendar is already configured and imported

// Get all events
const events = calendar.getEvents();

// Add a new event
const newEvent = {
  title: 'Meeting with team',
  start: '2024-06-10T10:00:00Z',
  end: '2024-06-10T11:00:00Z',
  description: 'Discuss project updates'
};
calendar.addEvent(newEvent);

// Update an event
const updatedEvent = {
  id: 'event_id', // Replace with actual event ID
  title: 'Updated Meeting',
  start: '2024-06-10T10:30:00Z',
  end: '2024-06-10T11:30:00Z',
  description: 'Discuss project updates and timelines'
};
calendar.updateEvent(updatedEvent);

// Delete an event
const eventId = 'event_id'; // Replace with actual event ID
calendar.deleteEvent(eventId);
