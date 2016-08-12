var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "725227860513"
            },
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');
        push.on('registration', function(data) {
            //$("#info_device").append(JSON.stringify(data));
            console.log('registration event: ' + data.registrationId);
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });
        push.on('error', function(e) {
            console.log("push error = " + e.message);
            //$("#info_device").append(JSON.stringify(e));
        });
        push.on('notification', function(data) {
            //$("#info_device").append(JSON.stringify(data));
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
},

scan: function() {
var User_Lat = window.localStorage.getItem("User_Lat");
var User_Lon = window.localStorage.getItem("User_Lon");
var geo_aprox = window.localStorage.getItem("geo_aprox");
cordova.plugins.barcodeScanner.scan(
function (result) {
//alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
$("#info_qr").html("Espere un momento...");
$("#info_qr").load(window.url_server+"/movil/validate_qr.php?f="+result.format+"&qr=" + result.text + "&token_push=" + window.localStorage.getItem("token_push") + "&lat="+User_Lat + "&lon="+User_Lon + "&geo_aprox="+geo_aprox);
if (result.format == "QR_CODE") {
window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
}
},
function (error) {
//alert("Scanning failed: " + error);
alert("Escaneo cancelado: " + error);
$("#info_qr").html("Espere un momento...");
$("#info_qr").load(window.url_server+"/movil/validate_qr.php?m="+error+"&token_push=" + window.localStorage.getItem("token_push") + "&lat="+User_Lat + "&lon="+User_Lon + "&geo_aprox="+geo_aprox);
}
);
}

};
