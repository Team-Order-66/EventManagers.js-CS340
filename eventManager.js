// import modules
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// Set up MySQL using dbcon.js file
const mysql = require('./db-config.js');
app.set('mysql', mysql);

// Set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Set up body parser
app.use(bodyParser.urlencoded({extended:true}));

// Set up route to static files 
app.use(express.static(path.join(__dirname, 'public')));

// Set up port for application
app.set('port', 60000);

// Routes
app.use('/tickets', require('./routes/tickets-page.js'));
app.use('/eventOrganizer', require('./routes/event-organizer-page.js'));
app.use('/eventVenue', require('./routes/event-venue-page.js'));
app.use('/customers', require('./routes/customers-page.js'));
app.use('/vipMembership', require('./routes/vip-page.js'));

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/index', (req, res) => {
  res.render('index');
});
/*
app.get('/vipMembership', (req, res) => {
  res.render('vipMembership');
});*/

app.get('/viewVIPMembers', (req, res) => {
  res.render('viewVIPMembers');
});

app.use(function(req,res){
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log(
    `Express started on http://${process.env.HOSTNAME}:${app.get(
      'port'
    )}; press Ctrl-C to terminate.`
  );
});
