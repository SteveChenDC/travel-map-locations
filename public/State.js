
CLIENT_ID = 'AIzaSyBQOY_LWXjQCdgZh3x2RrJwEJeAfeaElek';
var map;
var prev_infoWindow = false;

var state = {
	"userId":"12345",
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
}

function handleClickEvent(){
///when a location on the map is selected, add a marker and allow the user to enter notes
console.log('handle click event called');
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
	}

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
			updateIconImage(bodyType);
			createMarker();
			UpdateWindowMessage(message);
		});
	}
}

function displayPins(){
	console.log('display pins called');
	console.log(state);
	// state.locations.forEach(createMarker(state.locations));
	console.log(state.locations);
	for(i=0;i<state.locations.length; i++){
		createMarker(state.locations[i]);
	}
};


function createMarker(location){
	console.log('create marker');

	var latLng = {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)};
	console.log(latLng);
	var marker = new google.maps.Marker({
		position: latLng, 
		map: map
		// icon: icon
		////this could be potential flair for the page
	});

	marker.addListener('click', function(){
		var note = true;
		displayInfoWindow(location, marker, note)
	});

	marker.addListener('mouseover', function(){
		displayInfoWindow(location, marker);
	});
	
	// removeListeners();
	// var clickListener = marker.addListener('click', displayInfoWindow(location));
	// var hoverListener = marker.addListener('mouseover', displayNote(location));
	// var doubleClickListener = marker.addListener('dblclick', displayAllLocationInfo(index));
	//////this would be the flair for the page
}


function displayInfoWindow(location, marker, note){
//display the infoWindow on the marker with the info and an edit and delete button
	
	// console.log('display info window called');
	// console.log(location.notes);
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
	
	if(Boolean(note)){
		console.log('note is not empty');
		editInfoWindowNote()
		note = false;
	}
	//potentially have the same function, but pass in a different variable in order to display the note, edit the note with buttons or more/flair
	//if there is a 'note' parameter, display the note in an edit box and display button to edit note and delete marker
	
};




function removeListeners(){
	google.maps.event.clearInstanceListeners(marker);
}


function editInfoWindowNote(note){
	//infoWindow edit state
	console.log('edit note from infoWindow called');
	renderEditNote();
}

function renderEditNote(note){
	$("#editSpace").html(note);
	$("input").attr("placeholder", 'note');
	////http://stackoverflow.com/questions/13506481/change-placeholder-text

}


function displayAllLocationInfo(location){
	//bring up a larger view with the location infomation, notes, potentially an image and info about the country/ city nearby
}

function editLocationNotes(){
};



function displayLocationInfo(){
//called from the displayInfoWindow
///display the address
//display the location notes
var pinAddress = state.locations.address;
var locationNotes = state.locations.notes;
return '<h4>'+pinAddress +'</h4>'+ '<p>'+locationNotes+'</p>'
};




//state modification functions:


function showError(){
	console.log('an error occurred');
}


///on page load
function getAllUserLocations(){
	////if cookie exists, set the cookie value to be a variable
	///if no cookie, create a userId
	// var userId = 12345;
	// state.locations = [];

	console.log('get all users lcoations called');

	var result = $.ajax({
		url: `/mapLocations/${state.userId}`,
		DataType: 'jsonp',
		type: "GET"
	})
	///potentila difference between .get and $.ajax
	.done(function(result, status){
		setStateToResult(result);

	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);

		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		///how to best chain together then and done callbacks
		displayPins();
	});
};

function setStateToResult(result){
		//////just for testing purposes:
	// state.locations = [];
	// state.locations = result;

	// console.log('this is the result');
	// console.log(result);
	// console.log('the next thing would be the state');
	// console.log(state.locations);
}


function createLocation(){
		console.log('create lcoation called');

	var result = $.ajax({
		url: `/mapLocations`,
		DataType: 'jsonp',
		type: "POST"
	})
	.done(function(result, status){
		console.log('create locations done');
		// changePins(userId);
		//save to database
		//save to state
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('would the changePins(result) call be better/ work here');
		//update the UI based on state
	});
};



function deleteLocation(id){
///when a user selects the 'x', inside the inforWindow
///delete the location from the state
///load state again
///displayLocations(state)
	console.log('delete location called');
	var result = $.ajax({
		///this ID would be a variable
		url: `https://lit-retreat-41899.herokuapp.com/mapLocation/${id}`,
		DataType: 'jsonp',
		type: "DELETE"
	})
	.done(function(result, status){
		console.log('delete locations done');
		console.log(result);
		changePins(userId);
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('would the changePins(result) call be better/ work here');
	});
};



function saveLocationNotes(id){
///API call to updateNotes
	var result = $.ajax({
		////this id would be a variable
		url: `https://lit-retreat-41899.herokuapp.com/mapLocation/${id}`,
		DataType: 'jsonp',
		type: "PUT"
	})
	.done(function(result){
		console.log('save location notes done');
		console.log(result);
		changePins(userId);
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		console.log('would the changePins(result) call be better/ work here');
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









$(document).ready(function(){
	console.log('the document is ready');
	displayMap();
	// checkCookie();
	console.log(state.locations)
	displayLocations();
	getAllUserLocations();
});
