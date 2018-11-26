var http = require('http');
var express = require('express');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();


app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());


app.get('/', function(req, res){
	var id = req.cookies.student_id;

	res.render('human-index', {student_id : id});
});

app.get('/natural', function(req, res){
	var id = req.cookies.student_id;

	res.render('natural-index', {student_id : id});
});

app.get('/human', function(req, res){
	var id = req.cookies.student_id;

	res.render('human-index', {student_id : id});
});

app.listen(8000, function(){
	console.log("server is ready on port 8000!");
});
