// import modules
var express = require('express');
var path = require('path');
var app = express();

// Set up MySQL using dbcon.js file
const mysql = require('./db-config.js');
app.set('mysql', mysql);

// Set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set up route to static files 
app.use(express.static(path.join(__dirname, 'public')));

// Set up port for application
app.set('port', 60000);

// Routes with helper functions 
app.use('/tickets', require('./routes/tickets-page.js'));



app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/account', (req, res) => {
  res.render('account');
});

app.post('/logIn', (req, res) => {
  res.render('logIn');
});

app.get('/signUpNewAccount', (req, res) => {
  res.render('signUpNewAccount');
});

app.get('/eventScheduling', (req, res) => {
  res.render('eventScheduling');
});

app.get('/viewPurchase', (req, res) => {
  res.render('viewPurchase');
});

app.get('/createNewEvent', (req, res) => {
  res.render('createNewEvent');
});

app.get('/signUpNewEvent', (req, res) => {
  res.render('signUpNewEvent');
});

app.get('/vipMembership', (req, res) => {
  res.render('vipMembership');
});

app.get('/viewVIPMembers', (req, res) => {
  res.render('viewVIPMembers');
});

app.get('/viewAccount', (req, res) => {
  res.render('viewAccount');
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
