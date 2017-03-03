const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Sales = require('../models/sales');

function sendJson (res, status, data){
  res.status = status;
  res.json(data);
}

router.get('/products', function (req, res) {
  Product.find({}, function (err, docs) {
    if (err) {
      return sendJson(res, 404, {msg: 'Error buscando los documentos'});
    }
    return sendJson(res, 200, docs);
  });
});

module.exports = router;
