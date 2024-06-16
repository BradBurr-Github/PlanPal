let ec = new EventCalendar(document.getElementById('ec'), {
  view: 'timeGridWeek',
  events: [],
});

var events = []

//fetch call to our events api route save the data as our events array
const getEvents = async () => {
  try {
    const response = await fetch(`/api/events`, {
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
// Fetch events and update events array and calendar
const fetchAndDisplayEvents = async () => {
  try {
    events = await getEvents();
    console.log('Fetched events:', events);
    // ec.setOptions('date', new Date()); // Update events in calendar
  } catch (error) {
    console.error('Error fetching and displaying events:', error);
  }
};
// Call fetchAndDisplayEvents initially to populate events
fetchAndDisplayEvents();    

const saveEvent = async () => {

  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value.trim();
  const desc = document.getElementById("description").value.trim();
  const startTime = document.getElementById("startDateTime").value.trim();
  const endTime = document.getElementById("endDateTime").value.trim();

  let startDateTime = `${date}T${startTime}`;
  let endDateTime = `${date}T${endTime}`;

  console.log(startDateTime, endDateTime);
  
  if ( name, date, desc, startDateTime, endDateTime){
    const response = await fetch (`/api/events` , {
      method: 'POST',
      body: JSON.stringify({ name, desc, startDateTime, endDateTime,}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      alert("new event saved")
    } else {
      alert('Failed to create event');
    }
}};

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
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const desc = document.getElementById("description").value;
  const startTime = document.getElementById("startDateTime").value;
  const endTime = document.getElementById("endDateTime").value;

  let startDateTime = `${date}T${startTime}`;
  let endDateTime = `${date}T${endTime}`;

  console.log(startDateTime, endDateTime);

  const newEvent = { 
    name: name,
    // date: date,
    desc: desc,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
   };

  saveEvent(newEvent);
  fetchAndDisplayEvents();    
  console.log( newEvent );
  modal.style.display = "none";
}
});
