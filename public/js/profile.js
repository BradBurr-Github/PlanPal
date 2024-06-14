//fetch call to our events api route save the data as our events array
const getEvents = () =>
    fetch('/api/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());

    const saveEvents = () =>
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        const deleteEvents = () =>
            fetch('/api/events/${eventId}', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("hello profile.js")

    let ec = new EventCalendar(document.getElementById('ec'), {
        view: 'timeGridWeek',
        events: [ { start: '2024-06-13T10:00:00', end: '2024-06-13T12:00:00', title: 'Event 1' },
             { start: '2024-06-14T14:00:00', end: '2024-06-14T16:00:00', title: 'Event 2' } ]
                
        });

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("addEventModal");
    const btn = document.getElementById("addEventBtn");
    const span = document.getElementsByClassName("close")[0];

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
    }
  });



    // function createEvent () {

    // }

    // function updateOptions() {
    //     options.slotDuration = '01:00';
    // }

// const{ event_id, eventUser_id, user_id, confirmStatus, notes} = req.body;
// if(event_id, eventUser_id, user_id, confirmStatus, notes) {
// const newEvent = {
//     event_id, eventUser_id, user_id, confirmStatus, notes
// }
// }

let events = JSON.parse(data)       //data (IS THIS CORRECT)

events.push(newEvent);      // TODO: Create events JSON file just for events OR add event id to user id in the user data.json




    // console.log ("howdy")
