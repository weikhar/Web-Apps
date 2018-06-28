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
handleVisibilityChange();
document.addEventListener('visibilitychange', handleVisibilityChange, false);
window.addEventListener('blur', function(){logVisibility('blur');});
window.addEventListener('focus', function(){logVisibility('focus');});

function logVisibility(state)
{
  log3('document.visibilityState @ ' + showDT() + ' === V#' + VisCnt);
  VisCnt++;
  if 		(state == 'hidden')		{log3('Page is <em>hidden<em>');}
  else if	(state == 'prerender')	{log3('Page is <em>prerender<em>');}
  else if	(state == 'visible')	{log3('Page is <em>visible<em>');}
  else {log3('unknown');}
}

function handleVisibilityChange() {
  console.log( document.visibilityState );

  if (document.visibilityState == "hidden") 		{ logVisibility('hidden');} 
  else if (document.visibilityState == "prerender")	{ logVisibility('prerender');} 
  else if (document.visibilityState == "visible") 	{ logVisibility('visible');} 
  else { logVisibility('unknown');} 
}
