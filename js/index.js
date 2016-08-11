var app = {
initialize: function() {
this.bindEvents();
},
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
document.addEventListener('deviceready', this.onDeviceReady, false);
},
onDeviceReady: function() {
app.receivedEvent('deviceready');
},
receivedEvent: function(id) {
var push = PushNotification.init({
android: {
senderID: "930456109326"
},
ios: {
alert: "true",
badge: "true",
sound: "true"
},
windows: {}
});
push.on('registration', function(data) {
alert(JSON.stringify(data));
$(".push_notif_log").load("https://ivc.appmedica.tk/tools/push_api.php?action=registration&push="+JSON.stringify(data));
});
push.on('notification', function(data) {
alert(JSON.stringify(data));
$(".push_notif_log").load("https://ivc.appmedica.tk/tools/push_api.php?action=notification&push="+JSON.stringify(data));
/* data.message, data.title, data.count, data.sound, data.image, data.additionalData */
});
push.on('error', function(e) {
$(".push_notif_log").load("https://ivc.appmedica.tk/tools/push_api.php?action=error&push="+JSON.stringify(e));
// e.message
});
console.log('Received Event: ' + id);


function successCallback(bpm){
    alert("Your heart beat per minute is:" + bpm);
}
function errorCallback(){
    alert("Has not posible measure your heart beat");
}
var props = {
    seconds: 10,
    fps: 30
};
cordova.plugins.heartbeat.take(props, successCallback, errorCallback);


}
};
