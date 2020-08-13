/**
 *  VIP Page - routes
 *  1 SELECT QUERY - WILL DISPLAY THE TABLE OF VIP MEMBERS FROM THE MEMBERLIST TABLE
 *  1 INSERT QUERY - WILL INSERT THE SELECTED CUSTOMER AND EVENT VENUE INTO THE TALBE WITH AN INSERT
 *  1 DELETE QUERY - WILL DELETE A ROW FROM THE TABLE
 */


module.exports = function(){

    // import express and router from express
    const express = require('express');
    const router = express.Router();

    // this function will create a sql query that will get all the customers first name, last name based on the customer id stored
    // and the event venue that they are a member to
    function getVipMembers(res, mysql, context, complete){
        // sqlQuery for selecting the rows form the MemberList table
        sqlQuery = 'SELECT memberListID as id, Customer.firstName as fName, Customer.lastName as lName, EventVenue.venueName as venue FROM MemberList M' 
        sqlQuery += ' INNER JOIN Customer on M.customerID = Customer.customerID' // to get customer first name and last name based on id
        sqlQuery += ' INNER JOIN EventVenue on M.venueID = EventVenue.venueID'   // to get the event venue based on event venue id
        mysql.pool.query(sqlQuery, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vipMembers = results; // store data into context
            complete(); // if no errors, complete() function 
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {}; // the context object will be used to hold the values returned by the query
        context.jsscripts = ['delete-vip-member.js']; // references all the static javascript files we will need
        var mysql = req.app.get('mysql');  // mysql
        getVipMembers(res, mysql, context, complete); // call the getVipMembers function to get all the events in the database
        // render the vipMembers handlebars page query is complete from the getAllEvents function
        function complete(){
            callbackCount++;
            if (callbackCount>=1){
                res.render('vipMembership', context);
            }
        }
    });


    // this route will handle inserting a new event venue
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql'); // mysql
        var sqlQuery = 'INSERT INTO MemberList (customerID, venueID) VALUES (?,?)';  // creating our sql query
        var inserts = [req.body.customerID, req.body.venueID]; // values that take from the form th at will be inserted 
        sqlQuery = mysql.pool.query(sqlQuery, inserts, function (error, results, fields){
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/vipMembership');
            }
        });
    });

    // This route will delete a vip member from the MemberList M:M table

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql'); // mysql
        var sqlQuery = 'DELETE FROM MemberList WHERE memberListID = ?'; // our sql query 
        var inserts = [req.params.id] // the id of row of the customer/event venue combo aka the customer and the event venue for which that customer signed up for
        sqlQuery = mysql.pool.query(sqlQuery, inserts, function(error, results, fields){
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    })


    return router;
}();
