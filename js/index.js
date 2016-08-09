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
});
push.on('notification', function(data) {
alert(JSON.stringify(data));
/* data.message, data.title, data.count, data.sound, data.image, data.additionalData */
});
push.on('error', function(e) {
// e.message
});
console.log('Received Event: ' + id);
}
};
