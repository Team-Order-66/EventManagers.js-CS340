// Backend for our accounts page

const express = require('express');
const router = express.Router();


// select querey that will view our accounts -- yet to be properly implemented
router.get(‘/viewAccount’, (req, res) => {
  var context = {};
  mysql.pool.query(
  viewAccountInsertQuery,
  [req.query.c],
  function (err, result) {
    if (err) {
    	next(err);
    	return;
    }
  res.render(‘viewAccount’);
  }
});