//state modification functions:


function showError(){
	console.log('an error occurred');
};


///on page load
function getAllUserLocations(){
	console.log(`${state.userId}`);
	console.log('get all users locations called');
	if(state.userId ===""){
		return 'new user award';
	}else{
		var result = $.ajax({
			url: `/mapLocations/${state.userId}`,
			DataType: 'jsonp',
			type: "GET"
		})
		.done(function(result, status){
			console.log('done after get all users locations called, this would be the result:');
			console.log(result);
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
		// contentType: 'application/json',
		DataType: 'jsonp',
		type: "DELETE"
	})
	.done(function(result, status){
		console.log('delete locations done, this would be the status: ');
		console.log(status);
		displayMap();
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
	console.log('save locations called');
	closeInfoWindow();
	var result = $.ajax({
		url: `mapLocation/${id}`,
		contentType: 'application/json',
		processData: false,
		type: "PUT",
		data: JSON.stringify({notes: note})
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

