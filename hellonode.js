
/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
   res.write(req.url);
  res.end('Hello boss!');
}).listen(5000);*/

var express = require('express');
var app = express();

////////////////////////////////////

// config for your database

////////////////////////////////////
// define routes here..


app.use('/Scripts', express.static(__dirname + '/Scripts'));

app.use('/Img', express.static(__dirname + '/Img'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/Data', express.static(__dirname + '/Data'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/indextry1.html');
});


app.get('/database', function (req, res) {

    // create Request object
    
        
});

   
    







app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});