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
  document.querySelector('#data').innerHTML += message + '<br />';
}
function showDT() {return new Date().toLocaleString();}

// Get Battery Info
function logBattery(battery) {
  window.battery = battery;
  log('');
  log('<b>=== Battery Status API </b>: navigator.getBattery() @ ' + showDT() + ' ===');
  log('Battery level: ' + battery.level);
  log('Battery charging: ' + battery.charging);
  if (battery.dischargingTime) {log('Battery discharging time: ' + battery.dischargingTime); }
  battery.addEventListener('chargingchange', function() {
    log('Battery chargingchange event: ' + battery.charging);
  }, false);
  console.log('Battery: ', battery);
}

if (navigator.getBattery) 
{
  navigator.getBattery().then(logBattery, function() 
  {
    log("navigator.getBattery() doesn't work here.");
  });
} 
else if (navigator.battery) 
{	
  log('navigator.battery works');
  logBattery(navigator.battery);
} 
else 
{	log('Shame! The Battery API is not supported on this platform.'); }


//https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
//'fuelcell' is a variable name
navigator.getBattery().then(function(fuelcell) {
  function updatePowerInfo(){
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updatePowerInfo();

  fuelcell.addEventListener('chargingchange', 		function(){updateChargeInfo();});
  fuelcell.addEventListener('levelchange', 			function(){updateLevelInfo();});
  fuelcell.addEventListener('chargingtimechange', 	function(){updateChargingInfo();});
  fuelcell.addEventListener('dischargingtimechange',function(){updateDischargingInfo();});

  function updateChargeInfo(){
    log('');
    log('<b>=== Battery Status API (Mozilla) </b>: navigator.getBattery() @ ' + showDT() + ' ===');
    log("Fuelcell charging? " + (fuelcell.charging ? "Yes" : "No"));
  }
  function updateLevelInfo()		{log("Fuelcell level:            " + fuelcell.level * 100 + "%");}
  function updateChargingInfo()		{log("Fuelcell charging time:    " + fuelcell.chargingTime + " seconds");}
  function updateDischargingInfo()	{log("Fuelcell discharging time: " + fuelcell.dischargingTime + " seconds");}
});


//-------- Network Information API -----------------
//https://github.com/GoogleChrome/samples/tree/gh-pages/network-information
var numScan = 1;
function clog(message) {
  document.querySelector('#conndata').innerHTML += message + '<br />';
}
navigator.connection.addEventListener('change', logNetworkInfo);
function logNetworkInfo() {
  clog('');
  clog('<b>=== Network Information API </b>: navigator.connection @ ' + showDT() + ' === #' + numScan);
  // Network type that browser uses
  clog('Type: ' + navigator.connection.type);

  // Effective bandwidth estimate
  clog('Downlink: ' + navigator.connection.downlink + ' Mb/s');

  // Effective round-trip time estimate
  clog('rtt: ' + navigator.connection.rtt + ' ms');

  // Upper bound on the downlink speed of the first network hop
  clog('downlinkMax: ' + navigator.connection.downlinkMax + ' Mb/s');

  // Effective connection type determined using a combination of recently
  // observed rtt and downlink values: ' +
  clog('effectiveType: ' + navigator.connection.effectiveType);
  
  // True if the user has requested a reduced data usage mode from the user agent.
  clog('saveData: ' + navigator.connection.saveData);
  
  numScan++;
}
logNetworkInfo();


