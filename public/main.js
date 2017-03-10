
//variables to be used throughout multiple functions
var map;
var marker;
var message;
var icon;
var bodyType;
var latLng;
var geocoder;




function displayMap(){
	///called by the google maps instantiation in the index.html file
	console.log('display map called');
	var loc = {lat: 0, lng: 0};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: loc
	});
	locationListener();
}

function locationListener(){
	/// event listener to allow the map to listen to potential clicks
	console.log('location listener called');
	map.addListener('click', function(event){
		getAddress(event);
	});
}

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
			// updateIconImage(bodyType);

			createMarker(event);
			UpdateWindowMessage(message);
		});
	}
}

// function createMarker(event){
// 	///adds a marker onto the map where the click event occurred
// 	////a variable should be set to the event
// 	marker = new google.maps.Marker({
// 		position: event.latLng, 
// 		map: map,
// 		icon: icon
// 	});
// }

// function UpdateWindowMessage(message){
// 	///updates the marker's window with pertintent message
// 	var infoWindow = new google.maps.InfoWindow({
// 		content: message
// 	});
// 	infoWindow.open(map, marker);
// }