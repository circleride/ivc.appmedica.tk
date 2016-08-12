
console._log_old = console.log; console.log = function(msg){ alert("log: "+msg); console._log_old(msg); }
console._error_old = console.error; console.error = function(msg){ alert("error: "+msg); console._error_old(msg); }
console._warn_old = console.warn; console.warn = function(msg){ alert("warn: "+msg); console._warn_old(msg); }

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
window.id_cliente = "ivc";
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
var Lat = position.coords.latitude;
var Lon = position.coords.longitude;
if(Lat != ""){ window.localStorage.setItem("User_Lat", Lat); }
if(Lon != ""){ window.localStorage.setItem("User_Lon", Lon); }
window.localStorage.setItem("geo_aprox", position.coords.accuracy);
$("#User_Lat").val(Lat);
$("#User_Lon").val(Lon);
$(".User_Lat").val(Lat);
$(".User_Lon").val(Lon);
$(".User_LatLon_print").html(Lat+","+Lon);
$(".User_Lat_print").html(Lat);
$(".User_Lon_print").html(Lon);
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
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
document.addEventListener('deviceready', this.onDeviceReady, false);
},
onDeviceReady: function() {
app.setupPush();
app.carga_app();
},
setupPush: function() {
var push = PushNotification.init({
"android": {
"senderID": "930456109326"
},
"ios": {
"sound": true,
"vibration": true,
"badge": true
},
"windows": {}
});

push.on('registration', function(data) {
alert(JSON.stringify("reg: "+data));
//$("#info_device").append(JSON.stringify(data));
//console.log('registration event: ' + data.registrationId);
var oldRegId = localStorage.getItem('registrationId');
if (oldRegId !== data.registrationId) {
localStorage.setItem('registrationId', data.registrationId);
window.localStorage.setItem("token_push", JSON.stringify(data));
}

});
push.on('error', function(e) {
alert(JSON.stringify("error: "+e));
//$("#info_device").append(JSON.stringify(e));
//window.localStorage.setItem("token_push", JSON.stringify(e));
});

push.on('notification', function(data) {
//$("#info_device").append(JSON.stringify(data));
//window.localStorage.setItem("token_push", JSON.stringify(data));
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
},
carga_app: function(){
window.url_target = function url_target(page,id){
if(id == "undefined" || id == null || id == ""){ id = ""; }
if(page == "undefined" || page == null || page == ""){ page = ""; }
alert(page+" : "+id);
$('.ajax-content').html('<div align="center"><br><br><h4><i class="fa fa-spinner fa-spin"></i></h4><br></div>');
$.getJSON(window.url_server+"/movil/html.templates.php", { key: window.my_uuid, html: page, id: id, view_as: 'json' }, function (j) {
var stateObj = { html: page };
var data_html = j['content'];
$(".ajax-content").html(data_html);
});
};

jQuery(document).ready(function($){  });

}
};

app.initialize();
