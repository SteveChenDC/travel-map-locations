exports.DATABASE_URL  = (process.env.DATABASE_URL ||
						global.DATABASE_URL||
						'mongodb://localhost/travel-pin-map');


exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/test-travel-pin-map');
	

exports.PORT = process.env.PORT ||8080;


process.env.googleKey = 'AIzaSyBQOY_LWXjQCdgZh3x2RrJwEJeAfeaElek';