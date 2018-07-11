/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

//-------- Network Information API -----------------
//https://github.com/GoogleChrome/samples/tree/gh-pages/network-information

'use strict';
function log(message) {
  document.querySelector('#network').innerHTML += '<pre>' + message + '</pre>';
}
function showDT() {return new Date().toLocaleString();}

var numScan = 1;
var dayScan = 1;
var lastDate = 0;
//navigator.connection.addEventListener('change', logNetworkInfo); 
navigator.connection.addEventListener('change', cmpNetworkInfo);

var network_type 		= navigator.connection.type;
var downlink_Mbps 		= navigator.connection.downlink;
var rtt_ms 				= navigator.connection.rtt;
var downlink_Peak_Mbps	= navigator.connection.downlinkMax;
var effective_type 		= navigator.connection.effectiveType;
var User_saveData 		= navigator.connection.saveData;

logNetworkInfo();

function logNetworkInfo() {
  var d = new Date();
  //log('latest date = ' + d.getDate() + ' -- last date = ' + lastDate);
  if (lastDate != d.getDate()) 
  { 
    log('=== === === === ===');
	dayScan = 1;
	lastDate = d.getDate();
  }
  
  //log('<b>=== Network Information API </b>: navigator.connection @ ' + showDT() + ' === N#' + numScan);
  log('[' + numScan + '][' + dayScan + '] navigator.connection @ ' + showDT() + '===');
  // Network type that browser uses
  log('    a) Network type: ' + navigator.connection.type);

  // Effective bandwidth estimate
  log('    b) Bandwidth estimate: ' + navigator.connection.downlink + ' Mb/s');

  // Effective round-trip time estimate
  log('    c) Round-trip time: ' + navigator.connection.rtt + ' ms');

  // Upper bound on the downlink speed of the first network hop
  log('    d) Max downlink speed: ' + navigator.connection.downlinkMax + ' Mb/s');

  // Effective connection type determined using a combination of recently
  // observed rtt and downlink values: ' +
  log('    e) Connection type: ' + navigator.connection.effectiveType);
  
  // True if the user has requested a reduced data usage mode from the user agent.
  log('    f) Reduced data usage mode: ' + navigator.connection.saveData);
  
  numScan++;
  dayScan++;
}

function cmpNetworkInfo() {
  var d = new Date();
  //log('latest date = ' + d.getDate() + ' -- last date = ' + lastDate);
  if (lastDate != d.getDate()) 
  { 
    log('--- --- ---');
	dayScan = 1;
	lastDate = d.getDate();
  }
  else
  {
	  log ('---');
  }
	    
  log('[' + numScan + '][' + dayScan + '] navigator.connection @ ' + showDT() + '===');
 // log the changed parameter:
  if ( network_type != navigator.connection.type ) 
  { 
    log('    a) Network type was [' + network_type + '] now [' + navigator.connection.type + ']');
    network_type = navigator.connection.type; 
  }
  
  if (downlink_Mbps != navigator.connection.downlink) 
  {
    log('    b) Bandwidth estimate was [' + downlink_Mbps + ' Mb/s] now [' + navigator.connection.downlink + ' Mb/s]');
    downlink_Mbps = navigator.connection.downlink; 
  }
  
  if (rtt_ms != navigator.connection.rtt) 
  {
    log('    c) Round-trip time was [' + rtt_ms + ' ms] now [' + navigator.connection.rtt + ' ms]');
    rtt_ms = navigator.connection.rtt;
  }

  if (downlink_Peak_Mbps != navigator.connection.downlinkMax) 
  {
    log('    d) Max downlink speed was [' + downlink_Peak_Mbps + ' Mb/s] now [' + navigator.connection.downlinkMax + ' Mp/s]');
    downlink_Peak_Mbps = navigator.connection.downlinkMax;
  }

  if (effective_type != navigator.connection.effectiveType) 
  {
    // Effective connection type determined using a combination of recently
    // observed rtt and downlink values: ' +
    log('    e) Connection type was [' + effective_type + '] now [' + navigator.connection.effectiveType + ']');
    effective_type = navigator.connection.effectiveType;
  }

  if (User_saveData = navigator.connection.saveData) 
  {
    // True if the user has requested a reduced data usage mode from the user agent.
    log('    f) Reduced data usage mode was [' + User_saveData + '] now [' + + navigator.connection.saveData + ']');
    User_saveData = navigator.connection.saveData;
  }
  numScan++;
  dayScan++;
}


