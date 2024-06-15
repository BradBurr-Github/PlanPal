//fetch call to our events api route save the data as our events array
const getEvents = async () => {
  try {
    const response = await fetch('/api/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json(); 
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; 
  }
};

var events = []

// Fetch events and update events array and calendar
const fetchAndDisplayEvents = async () => {
  try {
    events = await getEvents();
    console.log('Fetched events:', events);
    ec.setOptions({ events }); // Update events in calendar
  } catch (error) {
    console.error('Error fetching and displaying events:', error);
  }
};

// Call fetchAndDisplayEvents initially to populate events
fetchAndDisplayEvents();    

console.log(events)

let ec = new EventCalendar(document.getElementById('ec'), {
  view: 'timeGridWeek',
  events: [],
  });

const saveEvent = async (event) => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
    if (!response.ok) {
      throw new Error('Failed to save event');
    }
    console.log('Event saved successfully');
  } catch (error) {
    console.error('Error saving event:', error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    console.log(`Event ${eventId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};


console.log("hello profile.js")


document.addEventListener('DOMContentLoaded', function() {

const btn = document.getElementById("addEventBtn");
const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("addEventModal");
  
// Show the modal when the button is clicked
btn.onclick = function() {
    modal.style.display = "block";
  }

// Hide the modal when the close button is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Hide the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission
$('#submitEvents').on('submit', function(event){
  event.preventDefault();
  $('#addEventModal').hide();
  // Process form data here
});

document.getElementById("addEventForm").onsubmit = function(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  console.log({ title, date, description });
  modal.style.display = "none";
}});
