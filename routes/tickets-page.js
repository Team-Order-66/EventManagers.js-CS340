/**
 *  Tickets Page - routes
 *  2 SELECT QUERIES - 1st one will select all events, 2nd one will select events based on name of event input by user
 *  1 INSERT QUERY - it will insert the event into the Event table with all the information
 */

module.exports = function() {
    const express = require('express');
    const router = express.Router();

    //function that will be used to get all events that are currently in the database and the event venue name based on the event venue id
    function getAllEvents(res, mysql, context, complete) {
        // sqlQuery for selecting the fields we want to display from the events - will use the venueID fk to grab the name of the event venue from EventVenue
        let sqlQuery = 'SELECT eventID, eventName, DATE_FORMAT(date,"%M %d %Y") as date, DATE_FORMAT(startTime,"%k:%i") as startTime, Event.ticketPrice as ticketPrice, EventVenue.venueName as venue';
        sqlQuery += ' FROM Event INNER JOIN EventVenue on Event.venueID = EventVenue.venueID';
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


    // this function will be used to get events by the name of the event
    function searchEventByName(res, mysql, context, complete) {
        let sqlQuery = 'SELECT eventID, eventName, DATE_FORMAT(date,"%M %d %Y") as date, DATE_FORMAT(startTime,"%k:%i") as startTime, Event.ticketPrice as ticketPrice, EventVenue.venueName as venue';
        sqlQuery += ' FROM Event INNER JOIN EventVenue on Event.venueID = EventVenue.venueID WHERE Event.eventName LIKE ';
        sqlQuery += mysql.pool.escape(req.params.s);
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
        context.jsscripts = ['search-ticket.js']; // references all the static javascript files we will need
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

    // this route will handle inserting a new event
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql'); // mysql
        var sqlQuery = 'INSERT INTO Event (eventName, date, startTime, endTime, ticketPrice, organizerID, venueID) VALUES (?,?,?,?,?,?,?)';  // creating our sql query
        var inserts = [req.body.eventName, req.body.date, req.body.startTime, req.body.endTime, req.body.ticketPrice, req.body.organizerID, req.body.venueID]; // values that take from the form th at will be inserted 
        console.log(inserts);
        sqlQuery = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/tickets');
            }
        });
    })

    // this route will handle searching for an event using the name of the event
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {}; // the context object will be used to hold the values returned by the query
        context.jsscripts = ['search-ticket.js']; // references all the static javascript files we will need
        var mysql = req.app.get('mysql');  // mysql
        searchEventByName(res, mysql, context, complete); // call the searchEventsByName function to get all the events in the database that correspond with the name
        // render the tickets handlebars page query is complete from the getAllEvents function
        function complete(){
            callbackCount++;
            if (callbackCount>=1){
                res.render('/search-tickets', context);
            }
        }
    });


    return router;

}();