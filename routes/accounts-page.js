module.exports = function() {
	const express = require('express');   
	const router = express.Router();       

  	router.post('/', function(req, res) {    
		var mysql = req.app.get('mysql');
 		var sqlQuery = 'INSERT INTO Customer (customerID, email, firstName, lastName, dateOfBirth, phone) VALUE (?,?,?,?,?,?)';
           	var inserts = [req.body.customerID, req.body.email, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.phone];
			console.log(inserts)
			sqlQuery = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
				if(error) {
					console.log(JSON.stringify(error));
					res.write(JSON.stringify(error));
					res.end();
				}else{    
					res.redirect('/account');    
				}     
		});    
});

return router;

}();
