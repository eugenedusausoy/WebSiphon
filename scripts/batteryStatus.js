function getBatteryStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            updateBatteryInfo(battery);

            // Update the info when battery status changes
            battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
            battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
        });
    } else {
        document.getElementById("battery-level").innerText = "Battery info not supported";
        document.getElementById("battery-charging").innerText = "Battery info not supported";
    }
}

function updateBatteryInfo(battery) {
    document.getElementById("battery-level").innerText = `${Math.round(battery.level * 100)}%`;
    document.getElementById("battery-charging").innerText = battery.charging ? "Yes" : "No";
}

window.onload = getBatteryStatus;
