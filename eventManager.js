var express = require('express');
var path = require('path');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1111);

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/tickets', (req, res) => {
  res.render('tickets');
});

app.get('/account', (req, res) => {
  res.render('account');
});

app.post('/logIn', (req, res) => {
  res.render('logIn');
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
