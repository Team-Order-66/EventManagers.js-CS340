module.exports = function() {
	const express = require('express');   
	const router = express.Router();       

    	function getAllAccounts(res, mysql, context, complete) {
        	var sqlQuery = 'SELECT * FROM Customer';
        	console.log(sqlQuery);
        	mysql.pool.query(sqlQuery, function(error, results, fields){
            
		if (error){
                	res.write(JSON.stringify(error));
                	res.end();
            	}

            	context.account = results;
            	console.log(results);
            	complete();
      	 	});
   	 }
	
    	router.get('/', function(req, res){
        	var callbackCount = 0;
        	var context = {};
        	context.jsscripts = [];
        	var mysql = req.app.get('mysql'); 
        	getAllAccounts(res, mysql, context, complete);
	        function complete(){
        	    callbackCount++;
           	    if (callbackCount>=1){
               		res.render('account', context);
            	    }
        	}
    	});

  	router.post('/', function(req, res) {    
		var mysql = req.app.get('mysql');
 		var sql = "INSERT INTO Customer (customerID, email, firstName, lastName, dateOfBirth, phone) VALUES (?, ?, ?, ?, ?, ?)";
           	var inserts = [req.body.customerID, req.body.email, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.phone];
			console.log(inserts)
			sql = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
				if(error) {
					console.log(JSON.stringify(error));
					res.write(JSON.stringify(error));
					res.end();
				}
                                else
                                {    
					res.redirect('/account');    
				}     
		});    
});

return router;

}();
