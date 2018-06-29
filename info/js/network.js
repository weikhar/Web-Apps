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
  document.querySelector('#network').innerHTML += message + '<br />';
}
function showDT() {return new Date().toLocaleString();}

var numScan = 1;
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
  log('---');
  //log('<b>=== Network Information API </b>: navigator.connection @ ' + showDT() + ' === N#' + numScan);
  log('navigator.connection @ ' + showDT() + ' === N#' + numScan);
  // Network type that browser uses
  log(' Type: ' + navigator.connection.type);

  // Effective bandwidth estimate
  log(' Downlink: ' + navigator.connection.downlink + ' Mb/s');

  // Effective round-trip time estimate
  log(' rtt: ' + navigator.connection.rtt + ' ms');

  // Upper bound on the downlink speed of the first network hop
  log(' downlinkMax: ' + navigator.connection.downlinkMax + ' Mb/s');

  // Effective connection type determined using a combination of recently
  // observed rtt and downlink values: ' +
  log(' effectiveType: ' + navigator.connection.effectiveType);
  
  // True if the user has requested a reduced data usage mode from the user agent.
  log(' saveData: ' + navigator.connection.saveData);
  
  numScan++;
}
function cmpNetworkInfo() {
  log('navigator.connection @ ' + showDT() + ' === N#' + numScan);
  // log the changed parameter:
  if ( network_type != navigator.connection.type ) 
  { 
    network_type = navigator.connection.type; 
    log(' Network type that browser uses: ' + network_type);
  }
  
  if (downlink_Mbps != navigator.connection.downlink) 
  {
    downlink_Mbps = navigator.connection.downlink; 
    log(' Effective bandwidth estimate: ' + downlink_Mbps + ' Mb/s');
  }
  
  if (rtt_ms != navigator.connection.rtt) 
  {
    rtt_ms = navigator.connection.rtt;
    log(' Effective round-trip time estimate: ' + rtt_ms + ' ms');
  }

  if (downlink_Peak_Mbps != navigator.connection.downlinkMax) 
  {
    downlink_Peak_Mbps = navigator.connection.downlinkMax;
    log(' Max downlink speed: ' + downlink_Peak_Mbps + ' Mb/s');
  }

  if (effective_type != navigator.connection.effectiveType) 
  {
    effective_type = navigator.connection.effectiveType;
    // Effective connection type determined using a combination of recently
    // observed rtt and downlink values: ' +
    log(' Effective connection type: ' + effective_type);
  }

  if (User_saveData = navigator.connection.saveData) 
  {
    User_saveData = navigator.connection.saveData;
    // True if the user has requested a reduced data usage mode from the user agent.
    log(' Reduced data usage mode: ' + navigator.connection.saveData);
  }
  numScan++;
}


