
window.onload = () => {
    getDeviceInfo();
    getBatteryStatus();
    getNetworkInfo();

};


// Collect data from features
const sessionData = {
    ip: null,
    os: null,
    browser: null,
    resolution: null,
    localDevices : null,
    hoveredAreas: [], // This is dynamic based on hover tracking
  };

let hoverTimers = {};
document.querySelectorAll('.info-block').forEach(block => {
  block.addEventListener('mouseenter', (event) => {
      const blockId = event.target.id;
      hoverTimers[blockId] = Date.now(); // Start timing for this block
  });

  block.addEventListener('mouseleave', (event) => {
      const blockId = event.target.id;
      const duration = ((Date.now() - hoverTimers[blockId]) / 1000).toFixed(2); // Time in seconds

      // Find if this blockId already exists in `hoveredAreas`
      let area = sessionData.hoveredAreas.find(area => area.blockId === blockId);

      if (area) {
          // If the blockId already exists, add the new duration to the existing duration
          area.duration = (parseFloat(area.duration) + parseFloat(duration)).toFixed(2);
      } else {
          // Otherwise, add a new entry for this blockId
          sessionData.hoveredAreas.push({ blockId, duration });
      }

      delete hoverTimers[blockId]; // Clear the timer for this block
  });
});


function saveSessionData(data) {
  fetch("http://localhost:3000/save-session-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Session data sent successfully!");
      } else {
        console.error("Failed to send session data.");
      }
    })
    .catch((error) => {
      console.error("Error sending session data:", error);
    });
}



// Send data to server when the user leaves the page
window.addEventListener('beforeunload', (event) => {
  saveSessionData(sessionData);
  event.preventDefault();
  event.returnValue = 'Are you sure to leave this page ? Please give us more data ❤️';  // Display a confirmation dialog
});

