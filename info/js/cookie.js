// 2018 Jun: browsers do not support cookie dropped from localhost or file:///
// therefore this demo will not work on local

'use strict';
function log4(message) {
  document.querySelector('#cookie').innerHTML += '<pre>' + message + '</pre>';
}

//document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
checkCookie();
  
  
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	log4("setCookie [" + cname + "]:[" + cvalue + "]:[" + expires + "]");
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

	log4("getCookie(" + cname + ")");

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
			var return_name = c.substring(name.length, c.length);
			log4("getCookie returning [" + return_name + "]");
            return return_name;
        }
    }
	log4("getCookie returns ''");
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
		log4("checkCookie @1: " + user);
    } else {
       //user = prompt("Please enter your name:","");
	   user = "abc123";
 	   log4("checkCookie @2: " + user);
       if (user != "" && user != null) {
 		   log4("checkcookie @2c = [" + user + "]");
           setCookie("username", user, 30);
       }
    }
}
