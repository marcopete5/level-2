// Simple script to update the transition timing values
const durationControl = document.getElementById('durationControl');
const delayControl = document.getElementById('delayControl');
const delayBox = document.querySelector('.delay-box');

function updateTransition() {
    const duration = durationControl.value;
    const delay = delayControl.value;
    delayBox.style.transitionDuration = `${duration}s`;
    delayBox.style.transitionDelay = `${delay}s`;
}

durationControl.addEventListener('change', updateTransition);
delayControl.addEventListener('change', updateTransition);

// Initialize
updateTransition();
