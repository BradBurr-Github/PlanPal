//fetch call to our events api route save the data as our events array
const getEvents = () =>
    fetch('/api/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const saveEvents = () =>
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const deleteEvents = () =>
            fetch('/api/events', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

console.log("hello profile.js")

// const{ event_id, eventUser_id, user_id, confirmStatus, notes} = req.body;
// if(event_id, eventUser_id, user_id, confirmStatus, notes) {
// const newEvent = {
//     event_id, eventUser_id, user_id, confirmStatus, notes
// }
// }

// let events = JSON.parse(data)       //data (IS THIS CORRECT)

// events.push(newEvent);      // TODO: Create events JSON file just for events OR add event id to user id in the user data.json

let ec = new EventCalendar(document.getElementById('ec'), {
    view: 'timeGridWeek',
    events: [
        // your list of events array
        ]

        });

    // console.log ("howdy")
