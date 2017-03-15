
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const jsonParser  = bodyParser.json();
 const uuid = require('node-uuid');


const {PORT, DATABASE_URL} = require('./config');
const Location = require('./models');
const router = require('./location-router');

const express  = require('express');
const app = express();


app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.Promise = global.Promise;

//working
app.get('/mapLocation', (req, res) => {
	Location
	.find()
	.exec()
	// .done((res)=>{
	// 	console.log('get all locations done');
	// })
	.then(mapLocation => {
		res.json(mapLocation.map(mapLocation => mapLocation.apiRepr()));
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});


///// working

app.get('/mapLocations/:userId', (req, res) => {
	console.log(req.params.userId);
	console.log(typeof(req.params.userId));
	Location
	.find({'userId': req.params.userId})
	.exec()
	// .done((res)=>{
	// 	console.log('get call done');
	// })
	.then(mapLocations => {
		res.json(mapLocations.map(mapLocations => mapLocations.apiRepr()));
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});

//working
app.post('/mapLocation', (req, res) => {
	console.log(req);
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
	// .done((res)=>{
	// 	console.log('post call done');
	// })
	.then(mapLocation => res.status(202).json(mapLocation.apiRepr()))
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'oops, something went wrong'});
	});
});

////working:
app.put('/mapLocation/:id', (req, res) => {
	const requiredFields = ['notes'];
	for(let i=0; i< requiredFields.length; i++){
		const field  = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in the request body.`;
			console.log(message);
			return res.status(400).send(message);
		};
	};
	///the ID is not being passed through the body, this validation can probably be removed:
	// if(req.params.id !== req.body._id){
	// 	const message = (`The requesting ID of \`${req.params.id}\` and the request body ID of \`${req.body.id}\` do not match.`);
	// 	console.error(message);
	// 	return res.status(400).send(message);
	// };
	const updated = {};
	updated.notes = req.body.notes;

	console.log(`updating the notes with the ID of ${req.params.id}`);
	
	Location
	.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
	.exec()
	// .done((res) =>{
	// 	console.log('put call done');
	// })
	.then(updatedNotes => res.status(201).json(updatedNotes.apiRepr()))
	.catch(err => res.status(500).json({message: 'oops, something went wrong'}));
});





////dice
app.delete('/mapLocation/:id', (req, res) => {
	Location
	.remove(mongoose.Types.ObjectId({_id: req.params.id}))
	justOne(true)
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
 		console.error(DATABASE_URL + PORT);
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
 }



function closeServer(){
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) =>{
			console.log('closing server');
			server.close(err =>{
				if(err){
					return reject(err);
				}
				resolve();
			});
		});
	});
}




 if(require.main === module){
 	runServer().catch(err => console.error(err));
 }

 module.exports= {runServer, app, closeServer};