var express = require('express');
// var http = require('http');

var app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/', express.static('./public'))

app.get('/', function(req, res) {
  res.render('Basic.html');
});

app.listen(8000);
console.log('Listening on 8000');
module.exports = app;