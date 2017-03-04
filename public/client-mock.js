const Mock_Locations_Data = {
	"locations": [
		{
			"address": "Rome, Italy",
			"latitude":"41.9028",
			"longitude": "12.4964",
			"notes":"I have been here.  great city.  I loved the history, but the ruins were disappointing"
		},
				{
			"address": "Bangkok, Thailand",
			"latitude":"13.7563",
			"longitude": "100.5018",
			"notes":"ancient city of the capitol of Siam, one of the most important trading cities in 1800's.  The King and I was based on this city."
		},
				{
			"address": "Akron, Ohio",
			"latitude":"41.0814",
			"longitude": "81.5190",
			"notes":""
		},
				{
			"address": "Helsinki, Finland",
			"latitude":"60.1699",
			"longitude": "24.9384",
			"notes":"I really want to go to grad school here.  Close to the fyords and denmark for access to the rest of europe"
		},
				{
			"address": "Barcelona, Spain",
			"latitude":"41.3851",
			"longitude": "2.1734",
			"notes":"I went here to study abroad in high school.  absolutely beautiful.  Fashion capital, good food and tons of culture."
		}
	]
};

///test function, will be removed later
function getAllLocations(callbackFn){
	setTimeout(function(){callbackFn(Mock_Locations_Data)}, 100);
}

function displayLocations(data){
	for(index in data.locations){
		////create a marker either by a function
		//marker = new google.maps.Marker({
			///some kind of repl to store the latitiude and longitude easier
			//position: data.locations.location.latitude +", "+ data.locations.location.longitude,
			////map should be a variable
			//map: map,
			//icon should be determined, or just set to basic marker image
			//icon: icon
			//});
			$('body').append('<p>' + data.locations[index].address + '</p>');
	}
}


function getAndDisplayLocations(){
	getAllLocations(displayLocations);
}

$(document).ready(function(){
	getAndDisplayLocations();
});

