// Backend for our Tickets page

const express = require('express');
const router = express.Router();


// RENDERS TICKET PAGE -- query for user yet to properly be impelemented
router.get('/tickets', function(res, req){
    var context = {};
    var sqlQuery = `
    SELECT
	    Event.eventName as Event,
        Event.date as Date,
        Event.ticketPrice as Price
    FROM
	    Event
    INNER JOIN GuestList 
	    USING (eventID)
    WHERE
        GuestList.customerID=?`
    
        mysql.pool.query(sqlQuerey, [req.query.customer_id], function(err, result){
            if(err){
                next(err);
                return;
              } else{
                  context.event = result;
                  res.render('/tickets',context);
              }

        })
        
})

module.exports = router;