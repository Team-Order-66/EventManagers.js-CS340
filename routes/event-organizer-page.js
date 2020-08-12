/**
 *  Event Organizser Page - routes
 *  2 SELECT QUERIES - 1st one will select all events, 2nd one will select events based on name of event input by user
 *  
 */

module.exports = function() {
    const express = require('express');
    const router = express.Router();

    //function that will be used to get all eventsOrganizers that are currently in the database
    function getAllEventOrganizers(res, mysql, context, complete) {
        // sqlQuery for selecting the fields we want to display from the events
        let sqlQuery = 'SELECT * FROM EventOrganizer';
        console.log(sqlQuery);
        mysql.pool.query(sqlQuery, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.organizers = results; // store data into context
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
        getAllEventOrganizers(res, mysql, context, complete); // call the getAllEvents function to get all the events in the database
        // render the tickets handlebars page query is complete from the getAllEvents function
        function complete(){
            callbackCount++;
            if (callbackCount>=1){
                res.render('eventOrganizer', context);
            }
        }
    });

    // this route will handle inserting a new event organizer
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql'); // mysql
        var sqlQuery = 'INSERT INTO EventOrganizer (organizerName, phone, email) VALUES (?,?,?)';  // creating our sql query
        var inserts = [req.body.organizerName, req.body.phone, req.body.email]; // values that take from the form th at will be inserted 
        console.log(inserts)
        sqlQuery = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/eventOrganizer');
            }
        });
    })



    return router;

}();