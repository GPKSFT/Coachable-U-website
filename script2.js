document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const nextButton = document.getElementById('nextButton');
    const nameInputSection = document.getElementById('nameInputSection');
    const calendarSection = document.getElementById('calendarSection');

    // Event listener for the next button
    nextButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userEmail = userEmailInput.value.trim();
        if (userName && userEmail) {
            nameInputSection.classList.add('hidden');
            calendarSection.classList.remove('hidden');
            populateCalendar(); // Call populateCalendar here
        } else {
            alert('Please enter your name and email.');
        }
    });

    // Function to populate the calendar
    function populateCalendar() {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = ''; // Clear previous calendar entries
        const today = new Date();
        const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

        for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = d.toDateString();
            dayDiv.dataset.date = d.toISOString().split('T')[0]; // Storing date in ISO format for easy comparison
            dayDiv.addEventListener('click', () => showTimes(dayDiv.dataset.date));
            calendar.appendChild(dayDiv);
        }
    }

    // Function to show available time slots
    function showTimes(date) {
        const timeSlots = document.getElementById('timeSlots');
        const timeList = document.getElementById('timeList');
        timeList.innerHTML = ''; // Clear previous time slots
        timeSlots.classList.remove('hidden');

        const times = getTimesForDate();
        times.forEach(time => {
            const timeItem = document.createElement('li');
            timeItem.textContent = convertToUserTime(date, time);
            timeItem.dataset.gmtTime = time;
            timeItem.classList.add('time-slot');
            if (isBooked(date, time)) {
                timeItem.classList.add('booked');
                timeItem.innerHTML = `<a href="Transaction.html" class="booked-link">${convertToUserTime(date, time)} (Booked)</a>`; // Replace with your actual page URL
            } else {
                timeItem.addEventListener('click', () => bookTime(date, timeItem.dataset.gmtTime, timeItem));
            }
            timeList.appendChild(timeItem);
        });
    }

    // Function to generate times for a date in GMT
    function getTimesForDate() {
        const times = [];
        for (let hour = 12; hour < 19; hour++) {
            times.push(`${hour}:00`);
            times.push(`${hour}:30`);
        }
        return times;
    }

    // Function to check if a time slot is booked
    function isBooked(date, gmtTime) {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        return bookings[`${date} ${gmtTime}`];
    }

    // Function to book a time slot
    function bookTime(date, gmtTime, timeItem) {
        const userName = userNameInput.value.trim();
        const userEmail = userEmailInput.value.trim();

        if (!userName || !userEmail) {
            alert('Please enter your name and email before booking.');
            return;
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        if (!bookings[`${date} ${gmtTime}`]) {
            bookings[`${date} ${gmtTime}`] = { name: userName, email: userEmail };
            localStorage.setItem('bookings', JSON.stringify(bookings));
            timeItem.classList.add('booked');
            timeItem.textContent += " (Booked)";
            alert(`You have booked ${convertToUserTime(date, gmtTime)} on ${date}`);

            // Redirect to the transaction page with query parameters
            window.location.href = `Transaction.html?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(gmtTime)}`;
        } else {
            alert(`The slot ${convertToUserTime(date, gmtTime)} on ${date} is already booked.`);
        }
    }

    // Function to convert GMT time to user's local time
    function convertToUserTime(date, time) {
        const [hours, minutes] = time.split(':');
        const gmtDate = new Date(Date.UTC(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2], hours, minutes));
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZoneName: 'short'
        }).format(gmtDate);
    }
});
