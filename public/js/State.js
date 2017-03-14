
CLIENT_ID = 'AIzaSyBQOY_LWXjQCdgZh3x2RrJwEJeAfeaElek';
var map;
var prev_infoWindow = false;

var state = {
	"userId":"1234",
	"locations":[
		{
			"id": "5ff54712-eb17-430b-8410-793e4dd202d9",
			"userId": "1234",
			"address": "Rome, Italy",
			"latitude":"41.9028",
			"longitude": "12.4964",
			"notes":"I have been here.  great city.  I loved the history, but the ruins were disappointing"
		},
				{
			"id": "5ff54712-eb17-430b-8410-793e4dd202d8",
			"userId": "1235",
			"address": "Bangkok, Thailand",
			"latitude":"13.7563",
			"longitude": "100.5018",
			"notes":"ancient city of the capitol of Siam, one of the most important trading cities in 1800's.  The King and I was based on this city."
		},
				{
			"id": "5ff54712-eb17-430b-8410-793e4dd202d7",
			"userId": "1236",
			"address": "Akron, Ohio",
			"latitude":"41.0814",
			"longitude": "81.5190",
			"notes":"born here"
		},
				{
			"id": "5ff54712-eb17-430b-8410-793e4dd202d6",
			"userId": "1237",
			"address": "Helsinki, Finland",
			"latitude":"60.1699",
			"longitude": "24.9384",
			"notes":"I really want to go to grad school here.  Close to the fyords and denmark for access to the rest of europe"
		},
				{
			"id": "5ff54712-eb17-430b-8410-793e4dd202d5",
			"userId": "1238",
			"address": "Barcelona, Spain",
			"latitude":"41.3851",
			"longitude": "2.1734",
			"notes":"I went here to study abroad in high school.  absolutely beautiful.  Fashion capital, good food and tons of culture."
		}
	]
};





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
	console.log('display map called');
	loc = {lat: 0, lng: 0,}
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: loc
		});
		handleClickEvent();
};

function handleClickEvent(){
///when a location on the map is selected, add a marker and allow the user to enter notes
console.log('handle click event called');
	map.addListener('click', function(event){
		getAddress(event);
	});
};

////to be used for the create location event:
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
				}else {
					bodyType = 'water';
					message = 'This body of water is unmarked, and may contain treasures.';
			}
			/////functions added here in order to act synchronicously
			// updateIconImage(bodyType);
			createMarker();
			UpdateWindowMessage(message);
		});
	};
};

function displayPins(){
	console.log('display pins called');
	console.log(state.locations);
	for(i=0;i<state.locations.length; i++){
		createMarker(state.locations[i]);
	};
};

function createMarker(location){
	console.log('create marker and set location');
	console.log(location);
	var locId = location.id;
	// console.log(location.id);
	// console.log('now working on the latLng');
	var latLng = {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)};
	// console.log(latLng);
	var marker = new google.maps.Marker({
		position: latLng, 
		map: map
		// icon: icon
		////this could be potential flair for the page
	});

	marker.addListener('click', function(){
		var noteExist = true;
		console.log('locId: '+locId)
		displayInfoWindow(location, marker, locId, noteExist )
	});

	marker.addListener('mouseover', function(){
		displayInfoWindow(location, marker, locId);
	});
	// marker.addListener('dblclick', displayModalWindow());
	//////this would be the flair for the page
};

function displayInfoWindow(location, marker, locId, noteExist){
	// console.log('display info window called');
	// console.log(location.notes);
	console.log('locId: '+locId);

	//////to handle closing previously opened infoWindows:
	if(prev_infoWindow){
		prev_infoWindow.close();
	};
	var message  = location.notes;
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

function removeListeners(){
	google.maps.event.clearInstanceListeners(marker);
};

function editInfoWindowNote(noteExist, locId){
	//infoWindow edit state
	console.log('edit note from infoWindow called');
	console.log('locationId: '+locId);
	renderNoteDetail(locId);
};

function renderNoteDetail(locId){
	console.log('render note detail called');
	$("#editHeader").html('this is where one would edit or delete a note');
	state.locations.find(function(location){
		console.log('trying to find the note');
		if(location.id===locId){
			////this placeholder text is not working right now.
			var note = location.notes
			console.log('this would be the note: '+note);
			$("input").attr("placeholder", note);
		};
	});
	//button listeners:
	$("#deleteButton").on("click", function(){
		deleteLocationControl(locId)
	});
	$("#saveNotesButton").on("click", function(){
		editLocationNotes(locId)
	});
};

function displayModalWindow(location){
	//bring up a larger view with the location infomation, notes, potentially an image and info about the country/ city nearby
};

function editLocationNotes(locId){
	console.log('editLocationNotes called');
};

function deleteLocationControl(locId){
	console.log('delete location called');
	///validation that a location exists
	///potential validation to delete the location's pin
	console.log(locId);
	deleteLocation(locId);
	console.log(`id of ${locId} deleted`);
	///confirmation that the pin's location has been deleted
};

function displayLocationInfo(){
	////just for testing purposes:
	var pinAddress = state.locations.address;
	var locationNotes = state.locations.notes;
	return '<h4>'+pinAddress +'</h4>'+ '<p>'+locationNotes+'</p>'
};





//state modification functions:


function showError(){
	console.log('an error occurred');
};


///on page load
function getAllUserLocations(){
	console.log(`${state.userId}`);
	console.log('get all users locations called');
	var result = $.ajax({
		url: `/mapLocations/${state.userId}`,
		DataType: 'jsonp',
		type: "GET"
	})
	.done(function(result, status){
		console.log('done after get all users locations called, this would be the result:');
		console.log(result);
		setStateToResult(result);
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('then after get all user locations called');
		displayPins();
	});
};

function setStateToResult(result){
	state.locations = [];
	state.locations = result;
};

////working:
function createLocation(object){
		console.log('create location called');
		var myJsonObject = JSON.stringify(object);

	var result = $.ajax({
		url: `/mapLocation`,
		type: "POST",
		contentType: 'application/json',
		processData: false,
		data: myJsonObject
	})
	.done(function(result, status){
		getAllUserLocations();
	})
	.fail(function(error, errorThrown){
		console.log(error);
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('then called from createLocations');
	});
};


///working:
function deleteLocation(id){
	console.log('delete location called');
	console.log(id);
	var result = $.ajax({
		url: `/mapLocation/${id}`,
		DataType: 'jsonp',
		type: "DELETE"
	})
	.done(function(result, status){
		console.log('delete locations done, this would be the status: ');
		console.log(status);
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('then called from delete locations');
		getAllUserLocations();
	});
};



function saveLocationNotes(id, note){
	var myJsonNote = JSON.stringify(note);
	console.log('save locations called');
	var result = $.ajax({
		url: `mapLocation/${id}`,
		contentType: 'application/json',
		processData: false,
		type: "PUT",
		data: `${myJsonNote}`
	})
	.done(function(result){
		console.log('save location notes done, this would be the result:');

	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('then from update notes called');
		getAllUserLocations();
	});
};



///render Functions:


function changePins(userId){
	getAllUserLocations(userId);
	displayLocations();
};


function displayLocations(){
///called on page load 
///renders the state to the map
	console.log('display locations called');

	var arrayOfParagraphs = state.locations.map(function(location){
			return "<p>" + location.address + "</p>";  
	});
	var stringToRender = arrayOfParagraphs.join("\n");
	$("#locationsSpace").html(stringToRender);

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
			"notes": "updated notes from the UI call"
		};
		id = '58c839515941040bd00cb474'
	$("#editNoteButton").on("click", function(){
		console.log('notes button clicked');
		saveLocationNotes(id, updatedNotesData)
	});
	///working:
	$("#deleteLocationButton").on("click", function(){
		console.log('delete button called');
		deleteLocation(id);
	});
	////please work
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
	displayLocations();
	getAllUserLocations();

});
