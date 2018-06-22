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
function log1(message) {
  document.querySelector('#data1').innerHTML += message + '<br />';
}
function showDT() {return new Date().toLocaleString();}

var BattScan = 1;

let batteryIsCharging = false;

if (navigator.getBattery) 
{	
  navigator.getBattery().then(function(battery) {
    log1('---');
    batteryIsCharging = battery.charging;
	  
    log1('navigator.getbattery() @ ' + showDT() + ' === B1#' + BattScan);
    log1('Battery level: ' + battery.level * 100 + '%');
    log1(battery.charging ? 'Battery charging state: charging' : 'Battery charging state: not charging');
	if (battery.dischargingTime) {
	  log1('Battery discharging time: ' + battery.dischargingTime);
	}
	battery.addEventListener('chargingchange', function() {
	  //batteryIsCharging = battery.charging;
	  //log('Battery chargingchange event: ' + batteryIsCharging);	  
	  log1('Battery chargingchange event: ' + battery.charging);
	});
	//battery.addEventListener('chargingchange', function() {}, false);
	battery.addEventListener('levelchange', function() {
	  log1('Battery levelchange event: ' + battery.onlevelchange);	  
	});
	battery.addEventListener('chargingtimechange', function() {
	  log1('Battery chargingtimechange event: ' + battery.onchargingtimechange);	  
	});
	battery.addEventListener('dischargingtimechange', function() {
	  log1('Battery dischargingtimechange event: ' + battery.ondischargingtimechange);	  
	});
  });
} 
else if (navigator.battery) 
{
  logBattery2(navigator.battery);
} 
else 
{
  log1('Shame! The Battery API is not supported on this platform.');
}

function logBattery2(battery) {
  log('---');
  log('navigator.battery @ ' + showDT() + ' === B2#' + BattScan);
  BattScan++;
  window.battery = battery;
  //log('Battery level: ' + battery.level * 100 + '%');
  log('Battery level: ' + battery.level);
  log('Battery charging: ' + battery.charging);
  if (battery.dischargingTime) {
    log('Battery discharging time: ' + battery.dischargingTime);
  }
  battery.addEventListener('chargingchange', function() {
    log('Battery chargingchange event: ' + battery.charging);
  }, false);
}
 