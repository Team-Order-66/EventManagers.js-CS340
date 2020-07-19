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

app.get('/event', (req, res) => {
  res.render('event');
});

app.get('/eventVenue', (req, res) => {
  res.render('eventVenue');
});

app.get('/eventOrganizer', (req, res) => {
  res.render('eventOrganizer');
});

app.get('/customer', (req, res) => {
  res.render('customer');
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
