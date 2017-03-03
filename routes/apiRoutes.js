const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Sales = require('../models/sales');

function sendJson (res, status, data){
  res.status = status;
  res.json(data);
}

router.get('/products', function (req, res) {
  //console.log(req.query);
  var re = new RegExp(req.query.filtro, 'i');
  Product.find({ $or: [{code: re}, {name: re}]}, function (err, docs) {
    if (err) {
      return sendJson(res, 404, {msg: 'Error buscando los documentos'});
    }
    //console.log(docs);
    return sendJson(res, 200, docs);
  });
});

module.exports = router;
