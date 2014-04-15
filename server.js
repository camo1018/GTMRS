// GTMRS NodeJS Server 
// Uses ExpressJS and EJS
// Paul Park

var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
	host: 'academic-mysql.cc.gatech.edu',
	database: 'cs4400_Group_31',
	user: 'cs4400_Group_31',
	password: 'ypKBU9LV'
});

app.configure(function() {
	app.set('views', __dirname+'/views');
	app.set('view options', { pretty: true });
	app.set('view engine', 'html');
	app.engine('.html', ejs.renderFile);
	app.use(express.static(__dirname+'/public'));
});

// Routes

// HTML
app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/login', function(req, res) {
	res.render('figure1.html');
});

app.get('/register', function(req, res) {
	res.render('figure2.html');
});

app.get('/patientprofile', function(req, res) {
	res.render('figure3.html');
});

// Data Retrieval
//

// End Routes

// Database Test
connection.connect();

connection.query('SELECT * FROM User', function(err, rows, fields) {
	if (err) throw err;

	console.log('The username of the first row: ', rows[0].Username);
});

connection.end();
// End Database Test

console.log("Server started at port 8000.");

app.listen(8000);