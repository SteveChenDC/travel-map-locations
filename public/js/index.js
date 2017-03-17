

////4 buttons for create, read, update, delete
///dump the results into the state
///i know that the render functions would work




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
	}
};

function setStateToResult(result){
	state.locations = [];
	state.locations = result;
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

