window.networkScanner = (function() {
    function scan(ipPrefix, i, callback, finishedCallback) {
        var intID_ws;
        var start_time_ws = Date.now();
        var closetimeout = 1200;
        var opentimeout = 2500;
        var process_port_ws = false;

        function websocket_scan(hostname) {
            var ws_scan;

            if ("WebSocket" in window) {
                ws_scan = new WebSocket("ws://" + hostname);
            } else if ("MozWebSocket" in window) {
                ws_scan = new MozWebSocket("ws://" + hostname);
            }

            intID_ws = setInterval(function() {
                var interval = Date.now() - start_time_ws;

                if (process_port_ws) {
                    clearInterval(intID_ws);
                    return;
                }
                
                if (ws_scan.readyState === 3) { // CLOSED
                    clearInterval(intID_ws);
                    process_port_ws = true;
                    done(interval < closetimeout);
                }

                if (interval >= opentimeout) {
                    clearInterval(intID_ws);
                    process_port_ws = true;
                    done(false);
                }
            }, 1);
        }

        function done(alive) {
            if (ws_scan) {
                ws_scan.close();
                ws_scan = undefined;
            }
            callback(ipPrefix + i, alive, i);

            if (i < 254) {
                scan(ipPrefix, i + 1, callback, finishedCallback);
            } else {
                if (finishedCallback) {
                    finishedCallback();
                }
            }
        }

        websocket_scan(ipPrefix + i);
    }

    return {
        scan: function(ipPrefix, callback, finishedCallback) {
            scan(ipPrefix, 1, callback, finishedCallback);
        }
    }
})();

function scanMyNetwork(myIp) {
    document.getElementById('scanner').hidden = false;
    
    // Validate the provided IP address format
    var regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\./;
    var match = myIp.match(regex);

    if (!match) {
        document.getElementById('networkscan').innerHTML = "Invalid IP address format. Please provide a valid IP.";
        return; // Exit the function if the IP format is invalid
    }

    var subnet = match[0];

    var elem = document.getElementById('networkscan');
    var progress = document.querySelector('#networkscan #progress');

    // Wait 5 seconds before we start, so there's less noise in the background
    setTimeout(function() {
        networkScanner.scan(subnet, function(ip, alive, i) {
            progress.innerHTML = 'Scanning ' + subnet + (i + 1) + ' - 255';

            if (alive) {
                elem.innerHTML += '<br><a target="_blank" href="http://' + ip + '/">' + ip + '</a>';
            }
        }, function() {
            progress.style.display = 'none';
        });
    }, 5000);
}

