//state modification functions:


function showError(){
	console.log('an error occurred');
};


///on page load
function getAllUserLocations(){
	if(state.userId ===""){
		return 'new user award';
	}else{
		var result = $.ajax({
			url: `/mapLocations/${state.userId}`,
			DataType: 'jsonp',
			type: "GET"
		})
		.done(function(result, status){
		})
		.fail(function(error, errorThrown){
			errorElem = showError(error);
			$('#errorSpace').append(errorElem);
		})
		.then(function(result){
			setStateToResult(result);
			console.log('critical testing');
			console.log(state.locations);
			console.log('get all users succeeded to call the set state');
		})
		.then(function(result){

			displayPins();
			console.log('then after get all user locations called');
			console.log('get all users succeeded to call the display pins');
		});
	}
};

function createLocation(object){
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
	});
};

function deleteLocation(id){
	var result = $.ajax({
		url: `/mapLocation/${id}`,
		// contentType: 'application/json',
		DataType: 'jsonp',
		type: "DELETE"
	})
	.done(function(result, status){
		displayMap();
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	})
	.then(function(result){
		getAllUserLocations();
	});
};

function saveLocationNotes(id, note){
	closeInfoWindow();
	var result = $.ajax({
		url: `mapLocation/${id}`,
		contentType: 'application/json',
		processData: false,
		type: "PUT",
		data: JSON.stringify({notes: note})
	})
	.done(function(result){
		getAllUserLocations();
	})
	.fail(function(error, errorThrown){
		errorElem = showError(error);
		$('#errorSpace').append(errorElem);
	});
};

