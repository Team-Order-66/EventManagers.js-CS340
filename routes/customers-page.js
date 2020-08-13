/**
 *  
 * 
 */

module.exports = function(){
  const express = require('express');
  const router = express.Router();

  //function that will be used to get all eventsOrganizers that are currently in the database
  function getAllCustomers(res, mysql, context, complete) {
      // sqlQuery for selecting the fields we want to display from the events
      let sqlQuery = 'SELECT * FROM Customer';
      console.log(sqlQuery);
      mysql.pool.query(sqlQuery, function(error, results, fields){
          if (error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.customers = results; // store data into context
          console.log(results)
          complete();
      });
  }

  // this will display all the events - note, not from the search bar - this will display right away when the page is loaded
  router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {}; // the context object will be used to hold the values returned by the query
      context.jsscripts = []; // references all the static javascript files we will need
      var mysql = req.app.get('mysql');  // mysql
      getAllCustomers(res, mysql, context, complete); // call the getAllEvents function to get all the events in the database
      // render the tickets handlebars page query is complete from the getAllEvents function
      function complete(){
          callbackCount++;
          if (callbackCount>=1){
              res.render('customers', context);
          }
      }
  });

  // this route will handle inserting a new event venue
  router.post('/', function(req, res){
    var mysql = req.app.get('mysql'); // mysql
    var sqlQuery = 'INSERT INTO Customer (email, firstName, lastName, dateOfBirth, phone) VALUES (?,?,?,?,?)';  // creating our sql query
    var inserts = [req.body.email, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.phone]; // values that take from the form th at will be inserted 
    console.log(inserts)
    sqlQuery = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
        if (error) {
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.redirect('/customers');
        }
    });
  });
  
  router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {}; // the context object will be used to hold the values returned by the query
      context.jsscripts = ["delete-customer.js"]; // references all the static javascript files we will need
      var mysql = req.app.get('mysql');  // mysql
      getAllCustomers(res, mysql, context, complete); // call the getAllEvents function to get all the events in the database
      // render the tickets handlebars page query is complete from the getAllEvents function
      function complete(){
          callbackCount++;
          if (callbackCount>=1){
              res.render('customers', context);
          }
      }
  });

  router.delete('/:customerID', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM Customer WHERE customerID = ?";
	var inserts = [req.params.customerID];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}
	})
  })

  return router;

}();
