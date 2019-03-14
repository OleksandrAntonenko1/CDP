var express = require('express');
var app = express();
var path = require('path');

app.get('/checkLogin/:login', function(req, res) {
  var status = (req.params.login === 'john.doe') ?
    'Nope, this login is already taken :(' :
    'Everything alright, go on!';

  res.send({status: status});
});

app.post('/createAccount', function(req, res) {
  res.send({status: 'ok'});
});

app.use(express.static(path.join(__dirname, '../web/')));
app.listen(3000);
console.log('Sever started at http://localhost:3000');