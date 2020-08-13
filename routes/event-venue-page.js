/**
 *  Event Venue Page - routes
 *  SELECT QUERIES - Will let you select all event venues from the database to see
 *  INSERT QUERIES - Will let you add a new event venue to the database
 */

module.exports = function() {
    const express = require('express');
    const router = express.Router();

    //function that will be used to get all eventsOrganizers that are currently in the database
    function getAllEventVenues(res, mysql, context, complete) {
        // sqlQuery for selecting the fields we want to display from the events
        var sqlQuery = 'SELECT * FROM EventVenue';
        console.log(sqlQuery);
        mysql.pool.query(sqlQuery, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.venues = results; // store data into context
            console.log(results);
            complete();
        });
    }

    // this will display all the events - note, not from the search bar - this will display right away when the page is loaded
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {}; // the context object will be used to hold the values returned by the query
        context.jsscripts = []; // references all the static javascript files we will need
        var mysql = req.app.get('mysql');  // mysql
        getAllEventVenues(res, mysql, context, complete); // call the getAllEvents function to get all the events in the database
        // render the tickets handlebars page query is complete from the getAllEvents function
        function complete(){
            callbackCount++;
            if (callbackCount>=1){
                res.render('eventVenue', context);
            }
        }
    });

    // this route will handle inserting a new event venue
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql'); // mysql
        var sqlQuery = 'INSERT INTO EventVenue (venueName, capacity, streetAddress, city, state, zipcode, phone) VALUES (?,?,?,?,?,?,?)';  // creating our sql query
        var inserts = [req.body.venueName, req.body.capacity, req.body.streetAddress, req.body.city, req.body.state, req.body.zipcode, req.body.phone]; // values that take from the form th at will be inserted 
        console.log(inserts)
        sqlQuery = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/eventVenue');
            }
        });
    })


    return router;
}();