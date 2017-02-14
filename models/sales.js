var Datastore = require('nedb'),
	db = new Datastore({filename: './salesStore', autoload: true});
/*
db.ensureIndex({fieldName: 'name', unique: true}, function (err) {
	if (err) {
		console.log('error of ensureIndex:', err);
	}
})
*/

module.exports = db;