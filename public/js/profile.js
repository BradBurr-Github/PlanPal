// import Calendar from '@event-calendar/core';
// import DayGrid from '@event-calendar/day-grid';

console.log("hello profile.js")
// let ec = new Calendar({
//     target: document.getElementById('ec'),
//     props: {
//         plugins: [DayGridGrid],
//         options: {
//             view: 'DayGridWeek',
//             events: [
//                 // your list of events
//             ]
//         }
//     }
// });

let ec = new EventCalendar(document.getElementById('ec'), {
    view: 'timeGridWeek',
    events: [
        // your list of events
        ]

        });

    // console.log ("howdy")