const uuid = require('uuid');
const mongoose = require('mongoose');

// var Schema = mongoose.Schema;


////use mongoose models:
const LocationsSchema = new mongoose.Schema({
	id: {type: String},
	userId: {type: String},
	address: {type: String},
	latitude: {type: String},
	longitude: {type: String},
	notes: {type: String}
});

//Virtual for LatAndLng
// LocationsSchema.virtual('latAndLng').get(function(){
// 	console.log(`latAndLng trying to be set to ${latAndLng}`);
// });

LocationsSchema.methods.apiRepr = function(){
	return {
		id: this._id,
		userId: this.userId,
		address: this.address,
		latitude: this.latitude,
		longitude: this.longitude,
		notes:this.notes
	};
}

const Location  = mongoose.model('Location', LocationsSchema);

module.exports = Location;


