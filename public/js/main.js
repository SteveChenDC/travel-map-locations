
var markers = [];
//Cookie handler:
var cname = '';

function setCookie(cname, cvalue, exdays){
	d = new Date();
	d.setTime(d.getTime()+ (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname+ "="+cvalue + ";"+expires+";path=/"
};

function checkCookie(){
	var user = getCookie("username");
	$('#welcome').html('Welcome to Travel Pin Map.');
	$('#locationsSpace').html('Please refresh your page to enter a username in order to collect your locations.');
	if(user === "" || user === null){
		$("#userModal").modal()
		usernameButtonListener(user);
	}else{
		handleUserName(user);
	};
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function handleUserName(user){
	setUserId(user);
	displayUserName(user);
	getAllUserLocations();
};

function usernameButtonListener(user){
	$("#createUserButton").on("click", function(){
		user = $("input#userName").val();
		if(user !== "" && user !== null){ 
			setCookie("username", user, 365);
		}else{
		 	$('#welcome').html('Welcome to Travel Pin Map.');
		 	return	$('#locationsSpace').html('Please refresh your page to enter a username in order to collect your locations.');
		}
		handleUserName(user);
	});
};

function clearUsername(){
	cname = '';
	checkCookie();
	getAllUserLocations();
};

function displayUserName(user){
	$('#welcome').html(user + '\'s Map Pin Board');
	$('#locationsSpace').html("Welcome back.  Locations can continue to be added to the map.  By double clicking a location's pin, notes can be added to the location.");
};

function setUserId(user){
	state.userId = user;
};



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
	newLocationObject = {
		userId: state.userId,
		address: address,
		latitude: latLng.lat,
		longitude: latLng.lng,
		notes: ""
	};
	createLocation(newLocationObject);
};

function setStateToResult(result){
	state.locations = [];
	displayPins();
	state.locations = result;
};

function displayPins(map){
	for(i=0;i<state.locations.length; i++){
		createMarker(state.locations[i]);
	};
};

function createMarker(location){
	var locId = location.id;
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
		displayModalWindow(location);
		closeButtonListener();
	});	
};

function addToMarkersArray(marker){
		markers.push(marker);
};

function setMapOnAll(map){
	for(var i=0; i<markers.lenth; i++){
		markers[i].setMap(map);
	};
};

function deleteMarkers(){
	clearMarkers;
	markers = [];
};

function clearMarkers(){
	setMapOnAll(null);
};

function closeButtonListener(){
	$("#closeButton").on("click", function(){
		displayPins();
	});
};

function closeInfoWindow(){
	prev_infoWindow.close();
};

function removeListeners(){
	google.maps.event.clearInstanceListeners(marker);
};

function editInfoWindowNote(noteExist, locId){
	renderNoteDetail(locId);
};

function editLocationNotes(locId, note){
	saveLocationNotes(locId, note);
};

function deleteLocationControl(locId){
	clearMarkers();
	closeInfoWindow();

	for(i=0;i<state.locations.length;i++){
		markers = state.locations;
		if(locId === state.locations.id){
			markers[i].setVisible(false);
			markers[i].setMap(null);
			markers[i].displayMap(null);
		};
	};
	deleteLocation(locId);
};






///render Functions:


function changePins(userId){
	getAllUserLocations(userId);
	displayLocations();
};

function renderNoteDetail(locId){
	clearEditPlaceholder();
	$("#editHeader").html('Add or update the notes on your location.');
	state.locations.find(function(location){
		if(location.id===locId){
			var note = location.notes
			if(note===''){
				$("textarea#noteInput").attr("placeholder", 'Add notes to attach to the location');
			}else{
				$("textarea#noteInput").attr("placeholder", note);
			};
		};
	});

	//button listeners:
	$("#deleteButton").on("click", function(){
		deleteLocationControl(locId)
	});

	$("#saveNotesButton").on("click", function(event){
		newNote  = $("textarea#noteInput").val();
		editLocationNotes(locId, newNote)
	});
};

function displayModalWindow(location){
	$("#dialogModal").modal()
	$('#locationModalHeader').html(location.address);
};

function displayInfoWindow(location, marker, locId, noteExist){
	//////to handle closing previously opened infoWindows:
	if(prev_infoWindow){
		closeInfoWindow();
	};
	var message = assignMarkerMessage(location);
	
	var infoWindow = new google.maps.InfoWindow({
		content: message,
		maxWidth: 200
	});
	infoWindow.open(map, marker);
	prev_infoWindow = infoWindow;
	
	if(Boolean(noteExist)){
		editInfoWindowNote(noteExist, locId)
		noteExist = false;
	};
};

function assignMarkerMessage(location){
	if(location.notes === ""){
		message  = "<div class=locationAddress>"+location.address+":</div><br><div class=infoWindowInstruction>Double click to add a note</div>"
	}else{
		message  = "<div class=locationAddress>"+location.address+":</div><br>" + location.notes;
	};
	return message;
};


function clearEditPlaceholder(){
	$("textarea#noteInput").attr("placeholder", '');
};





$(document).ready(function(){
	checkCookie();
});
