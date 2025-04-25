// Retrieve or initialize session time from sessionStorage
let sessionTime = parseInt(sessionStorage.getItem('sessionTime')) || 0;

// Retrieve or initialize total time from localStorage
let totalTime = parseInt(localStorage.getItem('totalTime')) || 0;

// Get references to the <div> elements
const sessionDiv = document.getElementById('sessionTime');
const totalDiv = document.getElementById('totalTime');

// Set initial text for the counters
sessionDiv.textContent = `Session Time: ${sessionTime} seconds`;
totalDiv.textContent = `Total Time: ${totalTime} seconds`;

// Update counters every second using setInterval
setInterval(() => {
    sessionTime++;
    totalTime++;
    sessionDiv.textContent = `Session Time: ${sessionTime} seconds`;
    totalDiv.textContent = `Total Time: ${totalTime} seconds`;
    // Save updated times to storage
    sessionStorage.setItem('sessionTime', sessionTime.toString());
    localStorage.setItem('totalTime', totalTime.toString());
}, 1000);

// Show an alert after 10 seconds using setTimeout
setTimeout(() => {
    alert("You've been on this page for 10 seconds in this session!");
}, 10000);
