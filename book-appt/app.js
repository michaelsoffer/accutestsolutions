/* Singleline functions
---------------------------------------------------------------- */

function $d(d){
	return document.getElementById(d);
}

/* Embed meeting + link popups
---------------------------------------------------------------- */

var apptthing = function(){

	// Variables
	var loaded = false;

	return {
		initialize:function(){

			// Variables
			var inlinefound = false;

			// Get all elements on the page
			var items = document.getElementsByTagName('*');

			// Loop
			for(var d=0;d<items.length;d+=1){

				// Inline embeds found?
				if(apptthing.hasclass(items[d], 'apptthingemb')){

					// Set
					inlinefound = true;

				}

			}

			// Found
			if(inlinefound){

				// Call
				apptthing.inline();

			}

			// PostMessage event listener
			if(window.addEventListener){
			    window.addEventListener("message", apptthing.listen, false);
			}else{
			    window.attachEvent("onmessage", apptthing.listen);
			}

		},
		widgetpopup:function(f){

			// Get frame
			var obj = $d('ae-meeting-emd-widget');

			// Object exists?
			if(!obj){

				// Get attributes
				var aui = f.getAttribute('data-appt-url');
				var atp = f.getAttribute('data-appt-types');
				var det = f.getAttribute('data-page-details');

				var dpt = f.getAttribute('data-page-text');
				var dpl = f.getAttribute('data-page-link');
				var dpl = f.getAttribute('data-button-background');
				var dpl = f.getAttribute('data-button-text');
				var emt = f.getAttribute('data-emb-num');

				// Reset values if undefined
				if(aui !== 'undefined' && aui !== null){}else{aui = '';}
				if(atp !== 'undefined' && atp !== null){}else{atp = '';}
				if(det !== 'undefined' && det !== null){}else{det = '';}
				if(dpt !== 'undefined' && dpt !== null){}else{dpt = '';}
				if(dpl !== 'undefined' && dpl !== null){}else{dpl = '';}
				if(emt !== 'undefined' && emt !== null){}else{emt = '';}

				// Create element
				var elm = document.createElement("div");

				// Set attributes
				elm.setAttribute("id", "ae-meeting-emd-widget");
				elm.setAttribute("class", "ae-meeting-emd-widget");
				elm.setAttribute("data-types", atp);

				// Inner HTML
				var str = '';

				// Append
				str += '<div class="ae-meeting-emd-inline-bg" id="ae-meeting-emd-inline-bg">';
				str += '	<div class="rl">';
				str += '		<div class="clo">';
				str += '			<div class="cl" onclick="apptthing.widgethide(this);return false;"><i class="material-icons">close</i></div>';
				str += '		</div>';
				str += '		<div class="load-ico" id="logatm-ic"></div>';
				str += '	</div>';
				str += '</div>';
				str += '<div class="ae-meeting-emd-inline" id="ae-meeting-emd-inline">';
				str += '	<div class="inlfrm">';
				str += '		<div class="apptthingembpoil" data-appt-url="' + aui + '" data-appt-types="' + atp + '" data-page-text="' + dpt + '" data-page-link="' + dpl + '" data-page-details="' + det + '" data-emb-num="' + emt + '" data-popup="true"></div>';
				str += '	</div>';
				str += '</div>';

				elm.innerHTML = str;

				// Append
				document.body.appendChild(elm);

				// Reset
				loaded = false;

				// Run
				apptthing.inline(true);

				// Loader + background
				apptthing.widgetload();

			}else{

				// Get existing types
				var tps = obj.getAttribute('data-types');
				var atp = f.getAttribute('data-appt-types');

				// New type?
				if(tps != atp){

					// Reset
					loaded = false;

					// Remove old instances
					apptthing.removeold('ae-meeting-emd-widget');

					// Recall
					apptthing.widgetpopup(f);

				}else{

					// Show
					apptthing.widgetshow();

				}

			}

		},
		widgetload:function(f){

			$d('ae-meeting-emd-inline-bg').style.display = 'block';
			$d('ae-meeting-emd-inline-bg').style.visibility = 'visible';

			// Show background loader
			setTimeout(function(){
				$d('ae-meeting-emd-inline-bg').className = 'ae-meeting-emd-inline-bg show';
			}, 200);

		},
		widgetshow:function(f){

			// ***********************************
			// Adjust top
			// ***********************************

			// Get page scroll top
			var doc = document.documentElement;
			var st = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

			// Set top
			$d('ae-meeting-emd-inline').style.top = (parseInt(st) + 20) + 'px';

			// Show + set invisible
			$d('ae-meeting-emd-inline-bg').style.display = 'block';
			$d('ae-meeting-emd-inline').style.display = 'block';
			$d('ae-meeting-emd-inline-bg').style.visibility = 'visible';
			$d('ae-meeting-emd-inline').style.visibility = 'visible';

			// Hide loader
			$d('logatm-ic').style.display = 'none';

			// Timed show
			setTimeout(function(){
				$d('ae-meeting-emd-inline-bg').className = 'ae-meeting-emd-inline-bg show';
			}, 200);

			// Timed show
			setTimeout(function(){
				$d('ae-meeting-emd-inline').className = 'ae-meeting-emd-inline show';
			}, 500);

		},
		widgethide:function(f){

			// Timed hide
			setTimeout(function(){
				$d('ae-meeting-emd-inline-bg').style.display = 'none';
				$d('ae-meeting-emd-inline').style.display = 'none';
			}, 1200);

			// Reset class
			$d('ae-meeting-emd-inline').className = 'ae-meeting-emd-inline';
			$d('ae-meeting-emd-inline-bg').className = 'ae-meeting-emd-inline-bg';

		},
		inline:function(act){

			// Run
			if(!loaded){

				// Set
				loaded = true;

				// Get items
				var items = document.getElementsByTagName('*');

				// Counter
				var count = 0;

				// Loop
				for(var d=0;d<items.length;d+=1){

					// Has class?
					if(apptthing.hasclass(items[d], 'apptthingemb') || apptthing.hasclass(items[d], 'apptthingembpoil')){
						if(!apptthing.hasclass(items[d], 'isset')){

							// Add to counter
							count++;

							// Get meeting reference
							var aui = items[d].getAttribute('data-appt-url');
							var atp = items[d].getAttribute('data-appt-types');

							// Get variables (if any)
							var det = items[d].getAttribute('data-page-details');
							var dpt = items[d].getAttribute('data-page-text');
							var dpl = items[d].getAttribute('data-page-link');
							var dpp = items[d].getAttribute('data-popup');
							var emt = items[d].getAttribute('data-emb-num');

							// Parameters variable (for calendar)
							var par = '';

							// Add parameters
							if(atp !== 'undefined' && atp !== null){par += '&etypes=' + atp;}
							if(det !== 'undefined' && det !== null){par += '&edetails=' + det;}
							if(dpt !== 'undefined' && dpt !== null){par += '&eptx=' + dpt;}
							if(dpl !== 'undefined' && dpl !== null){par += '&eplk=' + dpl;}
							if(dpp !== 'undefined' && dpp !== null){par += '&epop=' + dpp;}

							// Any calendar reference?
							if(aui !== 'undefined'){

								// Create iframe
								var elm = document.createElement("iframe");

								// Set onload handler
								elm.onload = function(){
									setTimeout(function(){

										// Invoke popup?
										if(act){
											
											// Show
											apptthing.widgetshow();

										}

									}, 1000);
								};

								// Set attributes
								elm.setAttribute("id", "ae-meeting-emd-" + count);
								elm.setAttribute("src", "https://appointmentthing.com/"+aui+"/?embed=true&emb_mtd="+emt+par+"#ae-meeting-emd-"+count);
								elm.setAttribute("frameborder", "0");
								elm.setAttribute("allowtransparency", "true");
								elm.setAttribute("class", "ae-meeting-emd-frame");
								elm.setAttribute("scrolling", "no");

								// Set styles
								elm.style.width = "100%";
								elm.style.height = "0px";
								elm.style.border = "0px";
								elm.style.overflow = "hidden";
								elm.style.visibility = "visible";
								elm.style.margin = "0 auto";
								elm.style.padding = "0px";
								elm.style.background = "transparent";

								// Reset
								items[d].innerHTML = "";

								// Add set
								items[d].className += items[d].className + ' isset';

								// Append
								items[d].appendChild(elm);

							}

						}
					}

				}

			}
	
		},
		removeold:function(cls){

			// Element list
			var list = document.getElementsByClassName(cls);
			for(var i=list.length-1;0<=i;i--){
				if(list[i] && list[i].parentElement)
				list[i].parentElement.removeChild(list[i]);
			}

		},
		hasclass:function(e,c){

			// Search + return
			return new RegExp('(\\s|^)' + c + '(\\s|$)').test(e.className);
		
		},
		ismobile:function(){

			// Test for mobile + tablet
			var xmob = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|WPDesktop|nokia|windows mobile|windows phone|iemobile/i.test(navigator.userAgent);
			if(xmob){
			
				// Return
				return true;

			}else{

				// Return
				return false;

			}

		},
		listen:function(msg){

			// Set callback string
			var str = '';

			// Data string
			try{

				// Get value
				str = msg.data.type.toString();

			}catch(e){

				// Failed or value blank

			}

			// Dimensions
			if(str == 'dimensions'){

				// Get dimensions from iframe
				var w = msg.data.w;
				var h = msg.data.h;

				// Get iframes
				var frames = document.getElementsByTagName('iframe');

				// Loop to find source match
				for(var i=0;i<frames.length;i++){

					// Match
				    if(frames[i].contentWindow === msg.source){

				    	// Update
				    	frames[i].style.height = h + "px";

				    	// Break
				        break;

				    }

				}

			}

		}
	};
}();

// Call
apptthing.initialize();