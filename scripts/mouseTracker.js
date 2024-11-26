let pageHoverTimers = {};
const infoBlocks = document.querySelectorAll('.info-block');

infoBlocks.forEach(block => {
    block.addEventListener('mouseenter', (event) => {
        const blockId = event.target.id;
        pageHoverTimers[blockId] = Date.now();
        document.getElementById('message').innerText = `You are viewing: ${event.target.querySelector('h2').innerText}`;
    });

    block.addEventListener('mouseleave', (event) => {
        const blockId = event.target.id;
        const timeSpent = (Date.now() - pageHoverTimers[blockId]) / 1000;
        document.getElementById('message').innerText = `You left ${event.target.querySelector('h2').innerText} after ${timeSpent.toFixed(2)} seconds`;
        delete pageHoverTimers[blockId]; // Clear the timer
    });
});

// Track mouse coordinates
document.addEventListener('mousemove', (event) => {
    document.getElementById('mouse-coordinates').innerText = `Mouse Position: X: ${event.clientX}, Y: ${event.clientY}`;
});
