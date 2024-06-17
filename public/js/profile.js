// Global EventCaledar Object
let calendarId = 0;
let eventsInDB = [];
let userColors = ['blue','green','purple'];
let calendarObject = new EventCalendar(document.getElementById('ec'), {
  view: 'timeGridWeek',
  events: []
});

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
    return [``]; 
  }
};

// Fetch events and update events array and calendar
const fetchAndDisplayEvents = async () => {
  try {
    events = await getEvents();
    console.log('Fetched events:', events);

    // Get all of the events from teh DB and add them to the Global eventsInDB array
    let userColor = 'blue';
    eventsInDB.length = 0;
    for(let i=0; i<events.length; i++) {
      if(events[i].organizer_id == 2) {
        userColor = userColors[1]; }
      else if(events[i].organizer_id == 3) {
        userColor = userColors[2]; }
      const event = {title: events[i].name,
                     start: events[i].startDateTime,
                     end: events[i].endDateTime,
                     backgroundColor: userColor };
      eventsInDB.push(event);
    }

    // Drop the current calendar object and create a new one
    document.getElementById('ec').remove();
    const newCalendarDiv = document.createElement('div');
    newCalendarDiv.id = 'ec';
    document.getElementById('calendar').appendChild(newCalendarDiv);

    // Create a new calendarObject
    calendarObject = new EventCalendar(document.getElementById('ec'), {
      view: 'timeGridWeek',
      events: [...eventsInDB]
    });
  } catch (error) {
    console.error('Error fetching and displaying events:', error);
  }
};

const saveEvent = async () => {

  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value.trim();
  const desc = document.getElementById("description").value.trim();
  const startTime = document.getElementById("startDateTime").value.trim();
  const endTime = document.getElementById("endDateTime").value.trim();
  const radioButtons = document.querySelectorAll('input[name="choice"]');

  let isPublic = false;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      if( radioButton.id === 'optYes' ) {
        isPublic = true;
      }
      else {
        isPublic = false;
      }
      break;
    }
  }
  
  let initSDateTime = `${date}T${startTime}`;
  let initEDateTime = `${date}T${endTime}`;  
  // Offset for MST Date Time zone
  const utcSDateTime = new Date(initSDateTime);
  const utcEDateTime = new Date(initEDateTime);
  utcSDateTime.setHours(utcSDateTime.getHours() - 6);
  utcEDateTime.setHours(utcEDateTime.getHours() - 6);
  const year = utcSDateTime.getFullYear();
  const month = ('0' + (utcSDateTime.getMonth() + 1)).slice(-2); // Months are zero based
  const day = ('0' + utcSDateTime.getDate()).slice(-2);
  let hours = ('0' + utcSDateTime.getHours()).slice(-2);
  let minutes = ('0' + utcSDateTime.getMinutes()).slice(-2);
  let seconds = ('0' + utcSDateTime.getSeconds()).slice(-2);
  const startDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  hours = ('0' + utcEDateTime.getHours()).slice(-2);
  minutes = ('0' + utcEDateTime.getMinutes()).slice(-2);
  seconds = ('0' + utcEDateTime.getSeconds()).slice(-2);
  const endDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  if ( name, date, desc, startDateTime, endDateTime){
    const response = await fetch (`/api/events` , {
      method: 'POST',
      body: JSON.stringify({ name, desc, startDateTime, endDateTime, isPublic,}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      //alert("New event created.")
    } else {
      alert('Failed to create event.');
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
  const radioButtons = document.querySelectorAll('input[name="choice"]');

  let initSDateTime = `${date}T${startTime}`;
  let initEDateTime = `${date}T${endTime}`;  
  // Offset for MST Date Time zone
  const utcSDateTime = new Date(initSDateTime);
  const utcEDateTime = new Date(initEDateTime);
  utcSDateTime.setHours(utcSDateTime.getHours() - 6);
  utcEDateTime.setHours(utcEDateTime.getHours() - 6);
  const year = utcSDateTime.getFullYear();
  const month = ('0' + (utcSDateTime.getMonth() + 1)).slice(-2); // Months are zero based
  const day = ('0' + utcSDateTime.getDate()).slice(-2);
  let hours = ('0' + utcSDateTime.getHours()).slice(-2);
  let minutes = ('0' + utcSDateTime.getMinutes()).slice(-2);
  let seconds = ('0' + utcSDateTime.getSeconds()).slice(-2);
  const startDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  hours = ('0' + utcEDateTime.getHours()).slice(-2);
  minutes = ('0' + utcEDateTime.getMinutes()).slice(-2);
  seconds = ('0' + utcEDateTime.getSeconds()).slice(-2);
  const endDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 
  let isPublic = false;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      if( radioButton.id === 'optYes' ) {
        isPublic = true;
      }
      else {

        isPublic = false;
      }
      break;
    }
  }

  const newEvent = { 
    name: name,
    desc: desc,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    isPublic: isPublic
   };

  saveEvent(newEvent);
  fetchAndDisplayEvents();  
  addEventForm.reset();  
  console.log( newEvent );
  modal.style.display = "none";
}
});

fetchAndDisplayEvents();
