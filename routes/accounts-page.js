/*module.exports = function() {
const express = require('express');   const router = express.Router();       
// select querey that will view our accounts -- yet to be properly implemented   
router.post(‘/', (req, res) {    
	var mysql = req.app.get('mysql');    
	var sql = "INSERT INTO Customer (email, firstName, lastName, dateOfBirth, phone) VALUES (?, ?, ?, ?, ?)";    
	var inserts = [req.body.email, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.phone];     
	sql = mysql.pool.query(sql,inserts,function (error, results, fields){    
		if (error) {    
			res.write(JSON.stringify(error));    
			res.end();    
		}else{    
			res.render(‘viewAccount’);    
		}     
	});    
});
return router;
}();
*/
