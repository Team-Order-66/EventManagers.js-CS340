/**
 *  Tickets Page - routes
 *  2 SELECT QUERIES - 1st one will select all events, 2nd one will select events based on name of event input by user
 *  
 */

module.exports = function() {
    const express = require('express');
    const router = express.Router();

    //function that will be used to get all events that are currently in the database
    function getAllEvents(res, mysql, context, complete) {
        // sqlQuery for selecting the fields we want to display from the events
        let sqlQuery = 'SELECT eventName, DATE_FORMAT(date,"%M %d %Y") as date, DATE_FORMAT(startTime,"%k:%i") as startTime, ticketPrice FROM Event';
        console.log(sqlQuery);
        mysql.pool.query(sqlQuery, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.events = results; // store data into context
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
        getAllEvents(res, mysql, context, complete); // call the getAllEvents function to get all the events in the database
        // render the tickets handlebars page query is complete from the getAllEvents function
        function complete(){
            callbackCount++;
            if (callbackCount>=1){
                res.render('tickets', context);
            }
        }
    });

    return router;

    // function that gets the events based on the name of the event
    // function searchEvents(res, mysql)
}();