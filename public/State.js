state = {
	locations:[
		{
			id: "",
			address: "",
			latitude: "",
			longitude: "",
			notes: ""
		}
	]
}

//state modification functions:

function addLocation(state, userId){
	//get the reverse geocode address to a variable
	//grab the city and state and county
	//set to the address variable in the state object
	//grab the latitude and longitude from the reverse geocode lookup
	///get any notes from the user input
	///add notes to the notes key in the locations array
	///set to the address variable in the state object
	//push a new location object into the locations array
}

function getAllUsersLocations(state, userId){
	var userId = 12345;
	$.getJSON(`/mapLocations/${userId}`, displayLocations);
};

function handleClickEvent(){
///when a location on the map is selected, add a marker and allow the user to enter notes
}



function deleteLocation(state, id){
///when a user selects the 'x', inside the inforWindow
///delete the location from the state
///load state again
///displayLocations(state)
	var result = $.ajax({
		
		url: "https://lit-retreat-41899.herokuapp.com/mapLocation/"& '58bcb2c020152c0bb722395b',
		DataType: 'jsonp',
		type: "Delete"
	})
	.done(function(results){

	});
	.fail(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	};
}

function editLocationNotes(state){
//allow the notes to be in an edit box
//display two buttons
}



function saveLocationNotes(state){
///API call to updateNotes
}



///render Functions:


function displayLocations(state){
///called on page load 
///renders the state to the map
var userLocations = state.locations
return (
	'<p>'+ 
	userLocations
	+
	'</p>'
	)
};


function renderLocations(){

}

function displayLocationInfo(state){
//called from the displayInfoWindow
///display the address
//display the location notes
var pinAddress = state.locations.address;
var locationNotes = state.locations.notes;
return '<h4>'+pinAddress +'</h4>'+ '<p>'+locationNotes+'</p>'
}


function displayInfoWindow(state){
//display the infoWindow on the marker with the info and an edit and delete button
//displayLocationInfo(state);
}
