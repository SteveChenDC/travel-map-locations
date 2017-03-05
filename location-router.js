// const express = require('express');

// const router = express.Router();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const jsonParser  = bodyParser.json();

// const {app, runServer, closeServer} = require('./server');
// const {Location} = require('./models');

// router.use(bodyParser.json());

// mongoose.Promise = global.Promise;



// router.get('/mapLocation', (req, res) => {
// 	console.log(Location);
// 	Location
// 	.findOne()
// 	.then(mapLocation =>
// 		res.json({
// 			address:mapLocation.address, 
// 			latitude:latitude, 
// 			longitude:longitude, 
// 			notes:notes
// 		}))
// 	.catch(err => {
// 		console.error(err);
// 		res.status(500).json({error: 'oops, something went wrong'});
// 	});
// });

// // router.get('/mapLocations/:userId', (req, res) => {
// // 	Location
// // 	.findById(req.params.userId)
// // 	.exec()
// // 	.then(mapLocations =>
// // 			res.json({
// // 			address:mapLocation.address, 
// // 			latitude:latitude, 
// // 			longitude:longitude, 
// // 			notes:notes
// // 			}))
// // 	.catch(err => {
// // 		console.error(err);
// // 		res.status(500).json({error: 'oops, something went wrong'});
// // 	});
// // });

// // router.post('/mapLocation', (req, res) => {
// // 	const requiredFields = ['address', 'latitude', 'longitude', 'notes', 'userId', 'id'];
// // 	for(let i=0; i< requiredFields.length; i++){
// // 		const field  = requiredFields[i];
// // 		if(!(field in req.body)){
// // 			const message = `Missing \`${field}\` in the request body.`
// // 			console.log(message);
// // 			return res.status(400).send(message);
// // 		}
// // 	}
// // 	///find a better way to create this model with mongoose
// // 	///add the userId to this model
// // 	Location
// // 	.create({
// // 		userId: req.body.Id,
// // 		Id: req.body.Id,
// // 		address: req.body.address,
// // 		longitude: req.body.longitude,
// // 		latitude: req.body.latitude,
// // 		notes: req.body.notes
// // 	})
// // 	.then(mapLocation => res.status(201).json(mapLocation.apiRepr()))
// // 	.catch(err => {
// // 		console.error(err);
// // 		res.status(500).json({error: 'oops, something went wrong'});
// // 	});
// // });



// router.delete('/mapLocation/:id', (req, res) => {
// 	Location
// 	.findByIdAndRemove(req.params.id)
// 	.exec()
// 	.then(()=> {
// 		console.log(`deleted location with an in of ${req.params.id}`);
// 		res.status(400).end();
// 	});
// });


// router.put('/mapLocation/:id', (req, res) => {
// 	const requiredFields = ['notes', 'latitude', 'longitude', 'id', 'userId', 'address'];
// 	for(let i=0; i< requiredFields.length; i++){
// 		const field  = requiredFields[i];
// 		if(!(field in req.body)){
// 			const message = `Missing \`${field}\` in the request body.`;
// 			console.log(message);
// 			return res.status(400).send(message);
// 		};
// 	};
// 	if(req.params.id !== req.body.id){
// 		const message = (`The requesting ID of \`${req.params.id}\` and the request body ID of \`${req.body.id}\` do not match.`);
// 		console.error(message);
// 		return res.status(400).send(message);
// 	};
// 	const updated = {};
// 	const updatableFields = ['notes'];
// 	updateableFields.forEach(field => {
//    	 	if (field in req.body) {
//       		updated[field] = req.body[field];
//     	}
//   	});
// 	console.log(`updating the location with the ID of ${req.params.id}`);
	
// 	Location
// 	.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
// 	.exec()
// 	.then(updatedNotes => res.status(201).json(updatedNotes.apiRepr()))
// 	.catch(err => res.status(500).json({message: 'oops, something went wrong'}));

// });



// router.use('*', function(req, res){
// 	res.status(404).json({message: 'Not Found'});
// });

// module.exports = {router};