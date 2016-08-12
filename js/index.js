
//console._log_old = console.log; console.log = function(msg){ alert("log: "+msg); console._log_old(msg); };
console._error_old = console.error; console.error = function(msg){ alert("error: "+msg); console._error_old(msg); };
console._warn_old = console.warn; console.warn = function(msg){ alert("warn: "+msg); console._warn_old(msg); };

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
$(".push_notif_log").load("https://ivc.appmedica.tk/tools/push_api.php?action=registration&push="+JSON.stringify(data)+"&device="+JSON.stringify(device));
});
push.on('notification', function(data) {
alert(JSON.stringify(data));
$(".push_notif_log").load("https://ivc.appmedica.tk/tools/push_api.php?action=notification&push="+JSON.stringify(data)+"&device="+JSON.stringify(device));
/* data.message, data.title, data.count, data.sound, data.image, data.additionalData */
if(typeof GetPushNotif == 'function') {
window.GetPushNotif(data);
} else {
window.GetPushNotif = data;
}
});
push.on('error', function(e) {
$(".push_notif_log").load("https://ivc.appmedica.tk/tools/push_api.php?action=error&push="+JSON.stringify(e)+"&device="+JSON.stringify(device));
// e.message
});

push.setApplicationIconBadgeNumber(function() {
console.log('success');
}, function() {
console.log('error');
}, 0);

console.log('Received Event: ' + id);
}
};

window.GetPushNotif = function GetPushNotif(data) {
data2 = data.additionalData;
if(data2.action == "load_html"){
alert("load_html: "+data2.data_action);
}
};
