function function_exists(func)
{
return (eval('typeof '+func) === 'function' || false);
}

var url_server_firebase = localStorage.getItem('url_server_firebase');
var url_server_firebase_def = "https://www.gstatic.com/firebasejs/3.2.1/firebase.js";
if (!url_server_firebase) {
window.url_server_firebase = url_server_firebase_def;
localStorage.setItem('url_server_firebase', url_server_firebase_def);
} else {
window.url_server_firebase = url_server_firebase;
}

var url_server = localStorage.getItem('url_server');
var url_server_def = "https://ivc.appmedica.tk";
if (!url_server) {
window.url_server = url_server_def;
localStorage.setItem('url_server', url_server_def);
} else {
window.url_server = url_server;
}

var id_cliente = window.localStorage.getItem("id_cliente");
if (!id_cliente) {
window.id_cliente = "";
} else {
window.id_cliente = id_cliente;
}

var color_header_aplicativo = localStorage.getItem('color_header_aplicativo');
var color_header_aplicativo_def = "#aaa";
if (!url_server) {
color_header_aplicativo = color_header_aplicativo_def;
} else {
//color_header_aplicativo = color_header_aplicativo;
}
$('.am-top-header').css("background-color", color_header_aplicativo );

function guid() {
function s4() {
return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
var my_uuid = localStorage.getItem('my_uuid');
var my_uuid_def = guid();
if (!my_uuid) {
window.my_uuid = my_uuid_def;
localStorage.setItem('my_uuid', my_uuid_def);
} else {
window.my_uuid = my_uuid;
}

if (navigator.geolocation) {
//navigator.geolocation.watchPosition(showPosition);
navigator.geolocation.getCurrentPosition(showPosition);
//alert("Geolicalizacion soportada.");
function showPosition(position) {
var geo_info = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
window.localStorage.setItem("User_Lat", position.coords.latitude);
window.localStorage.setItem("User_Lon", position.coords.longitude);
window.localStorage.setItem("geo_aprox", position.coords.accuracy);
//alert(geo_info);
}
} else {
//alert("Geolicalizacion no soportada.");
}

window.handle_url = "";
function handleOpenURL(url) {
setTimeout(function() {
//alert("Recibido: " + url);
window.handle_url = url;
window.onOnline(url);
}, 0);
}

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
app.setupPush();
},

setupPush: function() {

var push = PushNotification.init({
android: {
senderID: "930456109326"
},
browser: {
pushServiceURL: window.url_server+'/tools/push_api.php?my_uuid='+window.my_uuid
},
ios: {
alert: "true",
badge: "true",
sound: "true"
},
windows: {}
});

//console.log('after init');
push.on('registration', function(data) {
//$("#info_device").append(JSON.stringify(data));
//console.log('registration event: ' + data.registrationId);
var oldRegId = localStorage.getItem('registrationId');
if (oldRegId !== data.registrationId) {
// Save new registration ID
localStorage.setItem('registrationId', data.registrationId);
// Post registrationId to your app server as the value has changed
window.localStorage.setItem("token_push", JSON.stringify(data));
}
//var parentElement = document.getElementById('registration');
//var listeningElement = parentElement.querySelector('.waiting');
//var receivedElement = parentElement.querySelector('.received');
//listeningElement.setAttribute('style', 'display:none;');
//receivedElement.setAttribute('style', 'display:block;');

});
push.on('error', function(e) {
//console.log("push error = " + e.message);
//$("#info_device").append(JSON.stringify(e));
//window.localStorage.setItem("token_push", JSON.stringify(e));
if(typeof GetPushNotif == 'function') {
window.GetPushNotif(data);
} else {
window.GetPushNotif = data;
}
});

push.on('notification', function(data) {
//$("#info_device").append(JSON.stringify(data));
//window.localStorage.setItem("token_push", JSON.stringify(data));
console.log('notification event');
//window.GetPushNotif = function GetPushNotif(data) {  };
if(typeof GetPushNotif == 'function') {
window.GetPushNotif(data);
} else {
window.GetPushNotif = data;
}
/* navigator.notification.alert(
data.message,         // message
null,                 // callback
data.title,           // title
'Ok'                  // buttonName
); */
});
}
};
