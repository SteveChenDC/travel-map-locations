
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const jsonParser  = bodyParser.json();


const {PORT, DATABASE_URL} = require('./config');
const Location = require('./models');
const router = require('./location-router');

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
	console.log(req.params.userId);
	console.log(typeof(req.params.userId));
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
	const requiredFields = ['address', 'latitude', 'longitude', 'notes', 'userId', 'id'];
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
		userId: req.body.Id,
		id: req.body.Id,
		address: req.body.address,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		notes: req.body.notes
	})
	.then(mapLocation => res.status(201).json(mapLocation.apiRepr()))
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});



app.delete('/mapLocation/:id', (req, res) => {
	Location
	.findOneAndRemove(req.params.id)
	.exec()
	.then(()=> {
		console.log(`deleted location with an in of ${req.params.id}`);
		res.status(400).end();
	})
	.catch(() =>{
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
 				console.log(`your app is listening on port ${port}`)
 				resolve();
 			})
 			.on('error', err => {
 				mongoose.disconnect();
 				reject(err);
 				console.error(DATABASE_URL + PORT);

 			});
 		});
 	});
 }



function closeServer(){
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) =>{
			console.log('closing server');
			server.close(err =>{
				if(err){
					reject(err);
					return;
				}
				resolve();
			});
		});
	});
}




 if(require.main === module){
 	runServer().catch(err => console.error(err));
 }

 module.exports= {app, runServer, closeServer};