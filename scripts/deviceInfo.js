function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const parser = new UAParser(); // Create a new UAParser instance
    
    // Set browser info
    const browserInfo = parser.getBrowser();
    document.getElementById("browser").innerText = `${browserInfo.name} ${browserInfo.version}`;
    sessionData.browser = `${browserInfo.name} ${browserInfo.version}`;

    // Set screen resolution
    document.getElementById("resolution").innerText = `${window.screen.width} x ${window.screen.height}`;
    sessionData.resolution = `${window.screen.width} x ${window.screen.height}`;
    
    // Set OS info
    const osInfo = parser.getOS();
    document.getElementById("os").innerText = `${osInfo.name} ${osInfo.version}`;
    sessionData.os = `${osInfo.name} ${osInfo.version}`;
    
    // Set device info (e.g., mobile, tablet, desktop)
    const deviceInfo = parser.getDevice();
    const device = deviceInfo.name ? deviceInfo.name : "Unknown Device";
    document.getElementById("device").innerText = device;
    sessionData.device = deviceInfo.name || "Unknown Device";
}

window.onload = getDeviceInfo;
