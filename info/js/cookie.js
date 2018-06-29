'use strict';
function log4(message) {
  document.querySelector('#cookie').innerHTML += message + '<br />';
}

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
			log4("getCookie @1 = [" + cname + "]");
            return c.substring(name.length, c.length);
        }
    }
	log4("getCookie @2 = [" + cname + "]");
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
		log4("checkCookie @1: " + user);
    } else {
 	   log4("checkCookie @2a:" + user);
       //user = prompt("Please enter your name:","");
	   user = "abc123";
 	   log4("checkCookie @2b:" + user);
       if (user != "" && user != null) {
           setCookie("username", user, 30);
			log4("setCookie @2c = [" + user + "]");
       }
    }
}
