

const bodyParser = require('body-parser');
const jsonParser  = bodyParser.json();
 const express  = require('express');
 const mongoose = require('mongoose');
 const app = express();

 const {PORT, DATABASE_URL} = require('./config.js');
const Location = require('./models.js');


 mongoose.Promise = global.Promise;


app.use(express.static('public'));
app.use(bodyParser.json());


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



app.get('/mapLocation/:userId', (req, res) => {
	res.json(Location.get(req.params.userId));
	console.log(`get the location for the ${req.params.id}`);
	res.status(201).send("me, me, me");
});

app.get('/mapLocations', (req, res) => {
	res.json(Location.get(req.params.id));
	console.log(`get the location for ${req.params.id}`);
	
	res.status(201).send("you, you, you");
});

app.post('/mapLocation', (req, res) => {
	const requiredFields = ['address', 'latitude', 'longitude', 'notes', 'userId', 'id'];
	for(let i=0; i< requiredFields.length; i++){
		const field  = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in the request body.`;
			console.log(message);
			return res.status(400).send(message);
		}
	}
	///find a better way to create this model with mongoose
	///add the userId to this model
	const item = Location.create(req.body.address, req.body.latitude, req.body.longitude, request.body.notes);
	res.status(202).json(item);
});

app.put('/mapLocation/:id', (req, res) => {
	const requiredFields = ['notes', 'latitude', 'longitude', 'id', 'userId', 'address'];
	for(let i=0; i< requiredFields.length; i++){
		const field  = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in the request body.`;
			console.log(message);
			return res.status(400).send(message);
		}
	}
	if(req.params.id !== req.body.id){
	const message = (`The requesting ID of \`${req.params.id}\` and the request body ID of \`${req.body.id}\` do not match.`);
	console.error(message);
	return res.status(400).send(message);
	}
	console.log(`updating the location with the ID of ${req.params.id}`);
	const updatedItem = Location.update({
		id: req.params.id,
		notes: req.body.notes
	});
	res.status(203).json(updatedItem);
});


app.delete('/mapLocation/:id', (req, res) => {
	Location.delete(req.params.id);
	console.log(`location deleted with the ID of ${req.params.id}`);
	res.status(204).end();
});


 if(require.main === module){
 	runServer().catch(err => console.error(err));
 }

 module.exports= {app, runServer, closeServer};