async function getNetworkInfo() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById("ip").innerText = data.ip;

        let apikey = "";

        if (apikey === "") {
            document.getElementById("IPAPIKEY").innerText = "Warning : Missing API Key 🤓🤓🤓🤓🤓";
        }

        //const locationResponse = await fetch(`https://ipinfo.io/${data.ip}/json?token=${apikey}`);
        const locationData = await locationResponse.json();
        document.getElementById("location").innerText = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
    } catch (error) {
        document.getElementById("ip").innerText = "Unable to retrieve IP";
        sessionData.ip = data.ip;
        document.getElementById("location").innerText = "Location unavailable";
        sessionData.location = `${locationData.city}, ${locationData.region}, ${locationData.country}`;

        //console.error("Error fetching network information:", error);
    }
}

window.onload = getNetworkInfo;
