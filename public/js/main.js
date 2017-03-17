


var cname = '';
// userId = 12345;


///on page load event listener:
///////check if cookie exists function, during the page load

////Cookie handler:

// function setCookie(cname, cvalue, exdays){
// 	d = new Date();
// 	d.setTime(d.getTime()+ (exdays*24*60*60*1000));
// 	var expires = "expires="+d.toUTCString();
// 	document.cookie = cname+ "="+cvalue + ";"+expires+";path=/"
// 	console.log('this is the cookie'+document.cookie);
// };

// function checkCookie(){
// 	var user = getCookie("username");
// 	if(user !== "" || user !== null){
// 		var userName = user;
// 	} else{
// 		user = "theresa Augustin";
// 		////commenting for testing effiency
// 		// user = prompt("Please enter your name: ", "");
// 		if(user !== "" && user !== null){ // (!!user) === Boolean(user)
// 			setCookie("username", user, 365);
// 		};
// 	};
// 	displayUserName(user);
// 	setUserId(user);
// 	///also call getLocations(user);
// 	///handleClickEvent();
// };

// ////test with a button for setting a cookie or deleting a cookie


// function getCookie(cname){
// 	var name = cname + "=";
// 	var decodedCookie  = decodeURIComponent(document.cookie);
// 	var ca = decodedCookie.split(';');
// 	for(var i; i< ca.length; i++){
// 		var c = ca[i];
// 		while (c.charAt(0) == ' '){
// 			c = c.subString(1);
// 		}
// 		if(c.indexOf(name)==(0)){
// 			return c.subString(name.length, c.length);
// 		}
// 	}
// 	return "";
// };


// function displayUserName(user){
// 	///print the userName + 'map board' at the top of the page
// 	console.log('username ' + userName);
// 	$('#welcome').html(userName + '\'s Map Pin Board');
// };

// function setUserId(user){
// 	// state.userId = user;
// 	state.userId = 1234;
// 	console.log('userId', state.userId);
// };






////UI controls:

function displayMap(){
	///called by the google maps instantiation in the index.html file
	loc = {lat: 0, lng: 0,}
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: loc
		});
		handleMapClickEvent();
};

function handleMapClickEvent(){
	map.addListener('click', function(event){
		getAddress(event);
	});
};

function getAddress(event){
	///finds the address of the click event
	parseAddress(event);
	geocodeAddress(latLng);

	function parseAddress(event){
		///parses the click event results in order to be read by the reverse geocoder
		latLng = event.latLng.toString();
		latLng = latLng.replace(/[{()}]/g, '');
		latLng = latLng.split(',', 2);
	    latLng = {lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) };
	};

	function geocodeAddress(latLng){
		///reverse geocode the address in order to find the address from the latitute and longitude
		geocoder = new google.maps.Geocoder();
	    geocoder.geocode({'location': latLng}, function handleAddress(results, status){
	    	///handles UI updates based on the results and status returned by the geocode function
			if (status === 'OK'){
					var address = results[0].formatted_address;
					message = address;
					bodyType = 'land';
					createMarkerObject(latLng, address);
			}else {
					bodyType = 'water';
					message = 'This body of water is unmarked, and may contain treasures.';
			}
		});
	};
};

function createMarkerObject(latLng, address){
	console.log('create marker object called');
	newLocationObject = {
		userId: state.userId,
		address: address,
		latitude: latLng.lat,
		longitude: latLng.lng,
		notes: ""
	};
	createLocation(newLocationObject);
};

function displayPins(){
	console.log(state.locations, 'this is the state.locations object');
	for(i=0;i<state.locations.length; i++){
		createMarker(state.locations[i]);
		console.log('markers are created for each location');
	};
};

function createMarker(location){
	var locId = location.id;
	console.log('this is the specfic locationID', locId)
	var latLng = {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)};
	var marker = new google.maps.Marker({
		position: latLng, 
		map: map
		// icon: icon
		////this could be potential flair for the page
	});

	////event listeners on the markers:
	marker.addListener('click', function(){
		var noteExist = true;
		displayInfoWindow(location, marker, locId, noteExist )
	});
	marker.addListener('mouseover', function(){
		displayInfoWindow(location, marker, locId);
	});
	marker.addListener('dblclick', function(){
		displayModalWindow();
	});
};

function closeInfoWindow(){
	prev_infoWindow.close();
}

function removeListeners(){
	google.maps.event.clearInstanceListeners(marker);
};

function editInfoWindowNote(noteExist, locId){
	//infoWindow edit state
	renderNoteDetail(locId);
};

function editLocationNotes(locId, note){
	console.log('editLocationNotes called');
	saveLocationNotes(locId, note);
};

function deleteLocationControl(locId){
	console.log('delete location called');
	///validation that a location exists
	///potential validation to delete the location's pin
	closeInfoWindow();
	console.log(locId);
	deleteLocation(locId);
	console.log(`id of ${locId} deleted`);
	///confirmation that the pin's location has been deleted
};






///render Functions:


function changePins(userId){
	getAllUserLocations(userId);
	displayLocations();
};

function renderNoteDetail(locId){
	console.log('render note detail called');
	$("#editHeader").html('this is where one would edit or delete a note');
	state.locations.find(function(location){
		console.log('trying to find the note');
		if(location.id===locId){
			var note = location.notes
			console.log('this would be the note: '+note);
			$("textarea#noteInput").attr("placeholder", note);
		};
	});
	//button listeners:
	$("#deleteButton").on("click", function(){
		deleteLocationControl(locId)
	});
	$("#saveNotesButton").on("click", function(event){
		newNote  = $("textarea#noteInput").val();
		console.log('this would be the new note');
		console.log(newNote)
		///validations for submit function
		///the note textbox is not empty
		editLocationNotes(locId, newNote)
	});
};

function displayModalWindow(location){
	//bring up a larger view with the location infomation, notes, potentially an image and info about the country/ city nearby
};

function displayInfoWindow(location, marker, locId, noteExist){
	//////to handle closing previously opened infoWindows:
	if(prev_infoWindow){
		closeInfoWindow();
	};
	var message;
	if(location.notes === ""){
		message  = "<div class=infoWindowInstruction>Double click to add a note</div>"
	}else{
		message  = location.notes;
	}
	var infoWindow = new google.maps.InfoWindow({
		content: message,
		maxWidth: 200
	});
	infoWindow.open(map, marker);
	prev_infoWindow = infoWindow;
	
	if(Boolean(noteExist)){
		console.log('note is not empty');
		editInfoWindowNote(noteExist, locId)
		noteExist = false;
		////modal window
	};
};



/////////testing:
function testListeners(){
			var createLocationObject = {
    		"userId": "1234",
    		"address": "somewhere else else",
    		"latitude": "1.9028",
    		"longitude": "72.4964",
    		"notes": "this other super secret place esle"
		}
		var updatedNotesData = {
			"notes": "updated notes from the UI call on 3/15"
		};
		id = '58c839465941040bd00cb473'
	$("#editNoteButton").on("click", function(){
		console.log('notes button clicked');
		saveLocationNotes(id, updatedNotesData)
	});
	///working:
	$("#deleteLocationButton").on("click", function(){
		console.log('delete button called');
		deleteLocation(id);
	});
	$("#createLocationButton").on("click", function(){
		console.log('create button called');
		createLocation(createLocationObject)
	});
};





$(document).ready(function(){
	console.log('the document is ready');
	// displayMap();
	// checkCookie();
	// console.log(state.locations)
	testListeners();
	getAllUserLocations();
});