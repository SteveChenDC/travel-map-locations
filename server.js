 ////third party dependencies:
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const jsonParser  = bodyParser.json();
 const uuid = require('node-uuid');

///local file dependencies:
// const Google_Maps_Key = require('./config');
const {PORT, DATABASE_URL} = require('./config');
const Location = require('./models');
const router = require('./location-router');
const googleKey = require('./.env');



const express  = require('express');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.Promise = global.Promise;



app.get('/mapLocation', (req, res) => {
	Location
	.find()
	.exec()
	.then(mapLocation => {
		res.json(mapLocation.map(mapLocation => mapLocation.apiRepr()));
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});

app.get('/mapLocations/:userId', (req, res) => {
	Location
	.find({'userId': req.params.userId})
	.exec()
	.then(mapLocations => {
		res.json(mapLocations.map(mapLocations => mapLocations.apiRepr()));
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});

app.post('/mapLocation', (req, res) => {
	const requiredFields = ['latitude', 'longitude', 'notes', 'address', 'userId'];
	for(let i=0; i< requiredFields.length; i++){
		const field  = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in the request body.`
			console.log(message);
			return res.status(400).send(message);
		}
	}
	Location
	.create({
		id: uuid.v4(),
		userId: req.body.userId,
		address: req.body.address,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		notes: req.body.notes
	})
	.then(mapLocation => res.status(202).json(mapLocation.apiRepr()))
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});

app.put('/mapLocation/:id', (req, res) => {
	const requiredFields = ['notes'];
	for(let i=0; i< requiredFields.length; i++){
		const field  = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing ${field} in the request body.`;
			console.log(message);
			return res.status(400).send(message);
		};
	};
	const updated = {};
	updated.notes = req.body.notes;
	console.log(`updating the notes with the ID of ${req.params.id}`);
	
	Location
	.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
	.exec()
	.then(updatedNotes => res.status(201).json(updatedNotes.apiRepr()))
	.catch(err => res.status(500).json({message: 'oops, something went wrong'}));
});

app.delete('/mapLocation/:id', (req, res) => {
	Location
	.remove({_id: req.params.id})
	.exec()
	.then(()=> {
		res.status(201).json({message:'success'}).end();
		console.log(`server.js deleted location with an id of ${req.params.id}`);
	})
	.catch(err =>{
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});



let server;

 function runServer(databaseUrl = DATABASE_URL, port = PORT){
 	return new Promise((resolve, reject) => {
 		mongoose.connect(databaseUrl, err =>{
 			if(err){
 				return reject(err);
 			}
 			server = app.listen(port, () =>{
 				console.log(`your app is listening on port ${port}`);
 				resolve();
 			})
 			.on('error', err => {
 				mongoose.disconnect();
 				reject(err);
 			});
 		});
 	});
 };

function closeServer(){
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) =>{
			server.close(err =>{
				if(err){
					return reject(err);
				}
				resolve();
			});
		});
	});
};



 if(require.main === module){
 	runServer().catch(err => console.error(err));
 };

 module.exports= {runServer, app, closeServer};