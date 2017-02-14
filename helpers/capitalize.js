var hbs = require('hbs');

hbs.registerHelper('capitalize', function (string) {
	return string.toUpperCase();
})

module.exports = hbs;