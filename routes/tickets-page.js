/**
 *  Tickets Page - routes
 *  SELECT - Based on search via the name of the Event
 *  INSERT - B
 */



module.exports = function() {
    const express = require('express');
    const router = express.Router();

    //function that will be used to get all events that are currently in the database
    function getAllEvents(res, mysql, context, complete) {
        let sqlQuery = "SELECT ";


    }


    // function that gets the events based on the name of the event
    function searchEvents(res, mysql)
}