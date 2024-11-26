(function() {
    var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
    var downloadSize = 5245329; // bytes for the image size
    var oProgress = document.getElementById("speed");
    var networkType = document.getElementById("networkType");

    function showProgressMessage(msg) {
        if (oProgress) {
            oProgress.innerHTML = (typeof msg === "string") ? msg : msg.join(" ");
        }
    }

    function measureConnectionSpeed() {
        var startTime, endTime;
        var download = new Image();
        
        download.onload = function() {
            endTime = (new Date()).getTime();
            showResults();
        };

        download.onerror = function() {
            showProgressMessage("Error downloading the image.");
        };

        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function showResults() {
            var duration = (endTime - startTime) / 1000; // time in seconds
            var bitsLoaded = downloadSize * 8; // convert to bits
            var speedBps = (bitsLoaded / duration).toFixed(2); // in bits per second
            var speedKbps = (speedBps / 1024).toFixed(2); // in kbps
            var speedMbps = (speedKbps / 1024).toFixed(2); // in Mbps

            showProgressMessage([
                "<b>Download Speed:</b>",
                speedMbps + " Mbps"
            ]);
        }
    }

    function detectNetworkType() {
        if (navigator.connection) {
            var connectionType = navigator.connection.effectiveType || "Unknown";
            networkType.innerHTML = `<b>Network Type:</b> ${connectionType}`;
        } else {
            networkType.innerHTML = "<b>Network Type:</b> Not available";
        }
    }

    // Run both speed test and network type detection on page load
    window.addEventListener('load', function() {
        measureConnectionSpeed();
        detectNetworkType();
    });
})();
