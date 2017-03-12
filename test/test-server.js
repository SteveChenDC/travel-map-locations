
const chai  = require('chai');
const chaiHttp = require('chai-http');

const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
//const exists = require('../server.js');
const Location  = require('../models');
const {app, runServer, closeServer} = require('../server');
const {DATABASE_URL} = require('../config');
const {TEST_DATABASE_URL} = require('../config');

id
chai.use(chaiHttp);


function seedLocationsData(){
	console.log('seeding the database');
	const seedData = [];


	for(let i = 0; i<=10; i++){
		seedData.push(generateLocationsData());
	};
	return Location.insertMany(seedData);
};

function generateIDsData(){
 	const ids = ['5ff54712-eb17-430b-8410-793e4dd202b0', '5ff54712-eb17-430b-8410-793e4dd202b2', '5ff54712-eb17-430b-8410-793e4dd202b1', '5ff54712-eb17-430b-8410-793e4dd202b3'];
 	return ids[Math.floors(Math.random()*ids.length)];
}

function generateUserIdsData(){
	///what kind of value to store as the userID
	///store some kind of identifier with the cookie on the client GUID
	///create with client Javascript or JQuery
	const userIds = ['1234', '3456', '5677', '0988'];
	return userIds[Math.floor(Math.random()*userIds.length)];
};

function generateAddressesData(){
	const addresses = ['Rome, Italy', 'Barcelona, Spain', 'Bangkok, Thailand', 'Buenos Aires, Argentina'];
	return addresses[Math.floor(Math.random()*addresses.length)];
};

function generateLatitudesData(){
	const latitudes = ['12.496366', '41.385064', '13.756331', '-34.603684' ];
	return latitudes[Math.floor(Math.random()*latitudes.length)];
};

function generateLongitudesData(){
	const longitudes  = ['41.902783', '2.173403', '100.501765', '-58.381559'];
	return longitudes[Math.floor(Math.random()*longitudes.length)];
};

function generateNotesData(){
	const notes = ['these are the first potential set of ntoes.', 'these are notes about a great place that I would like to visit', 'these are notes about a place i stayed at and it was crazy man.']
	return notes[Math.floor(Math.random()*notes.length)];
};


function generateLocationsData(){
	return {
		userId: generateUserIdsData(),
		address: generateAddressesData(),
		latitude: generateLatitudesData(),
		longitude: generateLongitudesData(),
		notes: generateNotesData()
	}
};

function tearDownDb(){
	console.warn('deleting database');
	return mongoose.connection.dropDatabase();
};





describe('Locations', function(){
	
	before(function(){
		runServer(TEST_DATABASE_URL);
		return seedLocationsData();
	});

	// beforeEach(function(){
		
	// });

	// afterEach(function(){
		
	// });


	after(function(){
		tearDownDb();
		return closeServer();
	});

	describe('get all locations', function(){
		it('should get list of locations on get', function(){
			let res;
			return chai.request(app)
			.get('/mapLocation')

			.then(_res=>{
				res = _res;
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				console.log('this will be the res.body');
				console.log(res.body);
				res.body.should.have.length.of.at.least(1);
				res.body.forEach(function(item){
					item.should.be.a('object');
					item.should.have.all.keys(
						'_id', 'address', 'latitude', 'longitude', 'notes', 'userId'
					)
				});
			return Location.count()
			})
			.then(function(count){
				res.body.should.have.length.of(count);
			});
		});
	});

	describe('get information not regarding the locations', function(){
		it('should get and display locations to the html', function(){
			let resLocation;

			Location
			.findOne()
			.exec()
			.then(location =>{
				location.userId = resLocation.userId

				return chai.request(app)
				.get(`/mapLocations/${resLocation.userId}`)
			})

			.then(_res=>{
				res=_res;
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				const expectedKeys = ["address", "latitude", "longitude", "notes", "userId", "_id"];
				res.body.forEach(function(item){
					item.should.be.a('object');
					item.should.include.keys(expectedKeys);
				});
			})
			Location
			.count()
			.then(function(count){
				res.body.mapLocations.should.have.length.of(count);
			});
		});
		it('should return locations with the right fields', function(){
			let resLocation;
			
			Location
			.findOne()
			.exec()
			.then(location=>{
				console.log(resLocation, 'reslocation object');
				location.userId = resLocation.userId

				return chai.request(app)
				.get(`/mapLocations/${resLocation.userId}`)
			})
			
			.then(function(res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.should.have.length.of.at.least(1);
				res.body.forEach(function(location){
					location.should.be.a('object');
					location.should.include.keys('userId', 'address', 'latitude', 'longitude', '_id', 'notes');
				});
				resLocation = res.body[0];
				return Location.findById(resLocation.id).exec();
			})
			.then(resLocation =>{
				resLocation.address.should.equal(location.address);
				resLocation.latitude.should.equal(location.latitide);
				resLocation.longitude.should.equal(location.longitude);
				resLocation._id.should.equal(location._id);
				resLocation.notes.should.equal(location.notes);
			});
		});
	});


	describe('POST a new location', function(){
		it('should create a new location and store in the DB', function(){
			const newItem = {
				address: faker.address.streetAddress(), 
				latitude: faker.address.latitude(), 
				longitude: faker.address.longitude(), 
				notes: faker.lorem.sentences()
			}
			chai.request(app)
			.post('/mapLocation')
			.send(newItem)
			.then(function(err, res){
				res.should.have.status(202);
				res.body.should.be.json;
				res.body.should.be.a('object');
				res.body.id.should.not.be.null;
				res.body.should.include.keys('_id', 'address', 'longitude', 'latitude', 'notes', 'userId');
				res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
				res.body.address.should.equal(newItem.address);
				res.body.notes.should.equal(newItem.notes);
				return Location.find(req.body.id).exec()
			})
			.then(function(location){
				location.address.should.equal(newItem.address);
				location.latitude.should.eqaul(newItem.latitude);
				locaiton.longitude.should.equal(newItem.longitude);
				location.notes.should.equal(newItem.notes);
				location.notes.should.equal(newItem.userId);
			});
		});
	});


	describe('PUT should update the notes', function(){
		it('should update the notes on a put call', function(){
			const updateData = {
				notes: 'these would be updated notes',
			};
			
			return Location
			.findOne()
			.exec()
			.then(location=>{
				updateData._id = location._id
					console.log(`/mapLocation/${updateData._id}`, updateData);
				return chai.request(app)
				.put(`/mapLocation/${updateData._id}`)
				.send(updateData)

			})
			.then(res=>{
				res.should.have.status(201);
				res.body.should.be.a('object');
				//res.body.should.not.be.json;
				//res.body.should.deep.equal(updateData);
				return Location.findById(updateData.id).exec();
			})
			.then(location =>{
				location.notes.should.equal(updateData.notes);
			});
		});
	});


	describe('DELETE should remove the ID and references from the DB', function(){
		it('should delete the requested ID', function(){
			let location;
			return Location
			.findOne()
			.exec()
			.then(_location =>{
				location = _location;
				return chai.request(app).delete(`/mapLocation/${location.id}`);
			})
			.then(function(res){
				res.should.have.status(204);
				return Location.findById(location._sid).exec()
				///maybe not the exec above
			})
			.then(_location =>{
				should.not.exist(_location);
			});
		});
	});
});




