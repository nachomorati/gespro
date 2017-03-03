var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var Sales = require('../models/sales');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index');
})

router.post('/products', function (req, res) {
	Product.insert(req.body, function (err) {
		if (err) {
			return res.json({'msg':'Error while saving in the DB.', 'success':false, 'error':err.toString()});
		}
		//res.status(201).json({'msg':'Document inserted', 'success':true})
		res.redirect('/products');
	})

});

router.get('/products', function (req, res) {
	Product.find({}, function (err, docs) {
		if (err) {
			return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err});
		}
		var docs = docs.sort(function (a, b) {
			return a.code - b.code;
		});
		res.render('products', {products: docs});
	});
})

router.get('/product/:id', function (req, res) {
	Product.findOne({_id:req.params.id}, function (err, doc) {
		if (err) {
			return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err});
		}
		res.render('product', {product: doc});
	})
})

router.get('/confirm/:id', function (req, res) {
	Product.findOne({_id:req.params.id}, function (err, doc) {
		if (err) {
			return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err});
		}
		res.render('confirm', {product: doc});
	})
})

router.delete('/remove/:id', function (req, res) {
	Product.remove({_id: req.params.id}, {}, function (err) {
		if (err) {
			return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err});
		}
		res.redirect('/products');
	})
})

router.put('/product/edit/:id', function (req, res) {
	Product.update({_id:req.params.id}, {$set: req.body}, {}, function (err) {
		if (err) {
			return res.json({'msg':'Error while update the doc.', 'success':false, 'error':err});
		}
		res.redirect('/product/' + req.params.id);
	})
})

router.get('/sales', function (req, res) {
	res.render('sales');
});

router.get('/newsale', function (req, res) {
	Product
		.find({}, function (err, docs) {
			if (err) {
				req.flash('error', err)
				return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err});
			}
			res.locals.products = docs;
			//console.log(res.locals.products);
			res.render('newsale');
		})
})

router.post('/savesale', function (req, res) {
	//console.log(req.body);
	var cant = 0 - Number(req.body.qty);

	Product.findOne({_id:req.body.product}, function (err, doc) {
		if (err) {
			return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err.toString()});
		}
		//console.log(doc);
		doc.stock -= req.body.qty;
		//console.log(doc);
		if (doc.stock < 0) {
			req.flash('error', 'Sin Stock');
			return res.render('newsale', {flashError: req.flash('error')})
		}
		Product.update({_id: doc._id}, { $set: { stock: doc.stock }}, {}, function (err) {
			if (err) {
				return res.json({'msg':'Error while updating in the DB.', 'success':false, 'error':err.toString()})
			}
			//console.log('venta a insertar:', req.body);
			var sale = req.body;
			if (!sale.sale_date || sale.sale_date == undefined || sale.sale_date == '') {
				sale.sale_date = new Date();
			} else if (!sale.seller || sale.seller == undefined || sale.seller == '') {
				sale.saller == 'Anonimo';
			}
			Sales.insert(sale, function (err) {
				if (err) {
					return res.json({'msg':'Error inserting the data', 'success':false, 'Error':err.toString()})
				}
				res.redirect('/newsale');
			})

		})

	});
})

router.get('/getproduct', function (req, res) {
	console.log(req.query.id);
	Product.findOne({_id: req.query.id}, function (err, doc) {
		if (err) {
			return res.json({'msg':'Error while finding in the DB.', 'success':false, 'error':err.toString()});
		}
		res.json({product: doc});
	})
})

router.get('/newproduct', function (req, res) {
	res.render('newproduct');
})

router.get('/filter_by_code', function (req, res) {
	var filter = req.query.filter;

	Product.find({code: filter}, function (err, docs) {
		if (err) {
			req.flash('error', 'Error finding in the db');
			return res.render('index', {
				flashError: req.flash('error')
			})
		}
		console.log(docs);
		res.json(docs);
	})


})

module.exports = router;
