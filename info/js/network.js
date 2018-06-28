//https://raw.githubusercontent.com/samdutton/simpl/gh-pages/battery/js/main.js

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

'use strict';
function log(message) {
  document.querySelector('#network').innerHTML += message + '<br />';
}
function showDT() {return new Date().toLocaleString();}

//-------- Network Information API -----------------
//https://github.com/GoogleChrome/samples/tree/gh-pages/network-information
var numScan = 1;
navigator.connection.addEventListener('change', logNetworkInfo);

function logNetworkInfo() {
  log('---');
  //log('<b>=== Network Information API </b>: navigator.connection @ ' + showDT() + ' === N#' + numScan);
  log('navigator.connection @ ' + showDT() + ' === N#' + numScan);
  // Network type that browser uses
  log('Type: ' + navigator.connection.type);

  // Effective bandwidth estimate
  log('Downlink: ' + navigator.connection.downlink + ' Mb/s');

  // Effective round-trip time estimate
  log('rtt: ' + navigator.connection.rtt + ' ms');

  // Upper bound on the downlink speed of the first network hop
  log('downlinkMax: ' + navigator.connection.downlinkMax + ' Mb/s');

  // Effective connection type determined using a combination of recently
  // observed rtt and downlink values: ' +
  log('effectiveType: ' + navigator.connection.effectiveType);
  
  // True if the user has requested a reduced data usage mode from the user agent.
  log('saveData: ' + navigator.connection.saveData);
  
  numScan++;
}
logNetworkInfo();


