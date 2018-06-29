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

/*
The Page Visibility API defines a means to programmatically determine 
the visibility state of a top level browsing context, and to be notified 
if the visibility state changes. Without knowing the visibility state of 
a page, web developers have been designing web pages as if they are always 
visible. This not only results in higher machine resource utilization, but 
it prevents web developers from making runtime decisions based on whether 
the web page is visible to the user. Designing web pages with knowledge of 
the page's visibility state can result in improved user experiences and 
power efficient sites.

With this API, web applications can choose to alter their behavior based 
on whether they are visible to the user or not. For example, this API can 
be used to scale back work when the page is no longer visible.
*/

'use strict';
function log3(message) {
  document.querySelector('#pagevisibility').innerHTML += message + '<br />';
}
function showDT() {return new Date().toLocaleString();}

/*
VisibilityState enum
enum VisibilityState {
  "hidden", "visible", "prerender"
};
hidden:		The Document is not visible at all on any screen.
prerender:	The Document is loaded in the prerender mode and is not yet visible.
visible:	The Document is at least partially visible on at least one screen. This is the same condition under which the hidden attribute is set to false.
*/

var VisCnt = 1;
document.addEventListener('visibilitychange', handleVisibilityChange, true);
window.addEventListener('blur', function(){logVisibility(3);});
window.addEventListener('focus', function(){logVisibility(4);});

log3('document.visibilityState');
handleVisibilityChange();

function logVisibility(state)
{
  var msg = "";
  if (state == 0)		{ msg = "- Page is <em>hidden<em>"; }
  else if (state == 1)	{ msg = "- Page is <em>prerender<em>"; }
  else if (state == 2)	{ msg = "- Page is <em>visible<em>"; }
  else if (state == 3)	
  { 
	msg = "- Page <em>lost focus<em>"; 
	document.getElementById("pagevisibility").style.backgroundColor = "lightblue";
  }
  else if (state == 4)	
  { 
    msg = "- Page <em>got focus<em>"; 
	document.getElementById("pagevisibility").style.backgroundColor = "coral";
  }
  else { msg = "- Page is unknown state"; }
  
  log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] ' + msg);
  VisCnt++;

  //{log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] - Page is <em>hidden<em>');}
//{log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] - Page is <em>prerender<em>');}
//{log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] - Page is <em>visible<em>');}
//{log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] - Page <em>lost focus<em>');}
//{log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] - Page <em>got focus<em>');}
//{log3('[' + VisCnt + '] ' + showDT() + ' State [' + document.visibilityState + '] - Page is unknown state');}
}

function handleVisibilityChange() {
  console.log( document.visibilityState );

  if (document.visibilityState == "hidden") 		{ logVisibility(0); } 
  else if (document.visibilityState == "prerender")	{ logVisibility(1); } 
  else if (document.visibilityState == "visible") 	{ logVisibility(2); }
  else { logVisibility("unknown"); } 
}
