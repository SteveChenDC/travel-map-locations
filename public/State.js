


var state = {
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
}






var userId  = '12345';
// var id = '58bcb2c020152c0bb722395b';

///on page load event listener:
///////check if cookie exists function, during the page load

////Cookie handler:

function checkCookie(){
	var user = getCookie("username");
	if(user != ""){
		var userName = user;
		displayUserName(userName);
	} else{
		user = prompt("Please enter your name: ", "");
		if(user != "" && user != null){
			setCookie("username", user, 365);
		}
	}
}


function getCookie(cname){
	var name = cname + "=";
	var decodedCookie  = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i; i< ca.length; i++){
		var c = ca[i];
		while (c.charAt(0) == ' '){
			c = c.subString(1);
		}
		if(c.indexOf(name)==(0){
			return c.subString(name.length, c.length);
		}
	}
	setcookie(cname, cvalue, exdays)
}

function setCookie(cname, cvalue, exdays){
	d = new Date();
	d.setTime(d.getTime()+ (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname+ "="+cvalue + ";"+expires+";path=/"
}


displayUserName(userName){
	///print the userName + 'map board' at the top of the page
}

////UI controls:

function handleClickEvent(){
///when a location on the map is selected, add a marker and allow the user to enter notes
};



function editLocationNotes(state){
//allow the notes to be in an edit box
//display two buttons
};



function displayLocationInfo(state){
//called from the displayInfoWindow
///display the address
//display the location notes
var pinAddress = state.locations.address;
var locationNotes = state.locations.notes;
return '<h4>'+pinAddress +'</h4>'+ '<p>'+locationNotes+'</p>'
};


function displayInfoWindow(state){
//display the infoWindow on the marker with the info and an edit and delete button
//displayLocationInfo(state);
};





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
	////call the create function call here
};






///on page load
function getAllUsersLocations(userId){
	////if cookie exists, set the cookie value to be a variable
	///if no cookie, create a userId
	// var userId = 12345;
	state.locations = [];

	console.log('get all users lcoations called');

	var result = $.ajax({
		url: `/mapLocations/${userId}`,
		DataType: 'jsonp',
		type: "GET"
	})
	.done(function(result, status){
		state.locations = [];
		console.log('next is the response');
		///console.log(response);

		console.log('this is the result');
		console.log(result);
		///console.log(result.data);
		state.locations =  result;
		console.log('the next thing would be the state');
		console.log(state.locations);
		/////save results to state
		///display the locations here or where this function ing called
		displayLocations();
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	});
};

function setStateToResults(results){

	///////this needs to be adjusted.  
		state.locations.forEach(function(item){
			console.log('looping ' + item.address);
			state.locations[item].address = results
		});
}


function createLocation(){
		console.log('create lcoation called');

	var result = $.ajax({
		url: `/mapLocations/`,
		DataType: 'jsonp',
		type: "POST"
	})
	.done(function(result){
		console.log('the results are: '+result);
		console.log(result);
		console.log('next is the response');
		console.log(response);
		state.locations =  response.body;
		console.log('the next thing would be the state');
		console.log(state.locations);
		/////add results to state
		///display the locations from here or where this function is being called

	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
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
	.done(function(result){
		console.log(result);
		/////save results to state
		///probably display locations here
	})
	.fail(function(error, errorThrown){

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
		console.log(result);
		/////save results to state
		///probably display locations here
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	});
};



///render Functions:


function displayLocations(){
///called on page load 
///renders the state to the map
	console.log('display locations called');

	///for(index in state.locations){
	// state.locations.forEach(function(item){
	// 	console.log('looping ' + item.address);
	// 		$('body').html('<p>' + item.address + '</p>');
	// 	///this will be replaced by displaying markers on a map
	// });

	///or
	// 	var state = {
	// 	locations: [];
	// }

	var arrayOfParagraphs = state.locations.map(function(location){
			return "<p>" + location.address + "</p>";  
	});
	// returns ["123 Fake St.", "456 Fake St. Apt. 2", ...]
	var stringToRender = arrayOfParagraphs.join("\n");
	$("#locationsSpace").html(stringToRender);

};








$(document).ready(function(){
	console.log('the document is ready');
	// state.locations.forEach(function(item){
	// 	console.log(item.address);
	// })
	console.log('cookie'+cname);
	console.log(state.locations)
	displayLocations();
	getAllUsersLocations(userId);
});
