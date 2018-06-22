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
	logBatt(battery);

	battery.addEventListener('chargingchange', function() {
	  log1('Battery Event - chargingchange');
	  logBatt(battery);  
	});
	battery.addEventListener('levelchange', function() {
	  log1('Battery Event - levelchange');
	  logBatt(battery);	
	});
	battery.addEventListener('chargingtimechange', function() {
	  log1('Battery Event - chargingtimechange');	
	  logBatt(battery);   
	});
	battery.addEventListener('dischargingtimechange', function() {
	  log1('Battery Event - dischargingtimechange');
	  logBatt(battery);	  
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


function logBatt(battery)
{
  log1('navigator.getbattery() @ ' + showDT() + ' === B1#' + BattScan);
  BattScan++;
  log1('Battery level: ' + battery.level * 100 + ' %');
  log1(battery.charging ? 'Battery charging state: charging' : 'Battery charging state: not charging');
  if (battery.dischargingTime == 'Infinity')
  {
    log1('Battery discharging time: Infinity');	
  }
  else
  {
    var dts = battery.dischargingTime;
    var dtm = dts / 60;
    var dth = dtm / 60;
    log1('Battery discharging time: ' + dts + ' sec = ' + dtm.toFixed(2) + ' min = ' + dth.toFixed(2) + ' hrs');
  }
  log1('---');
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
 