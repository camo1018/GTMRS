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

app.get('/doctorprofile', function(req, res) {
	res.render('figure4.html');
});

app.get('/ordermedication', function(req, res) {
	res.render('figure7.html');
});

app.get('/paymentinfo', function(req, res) {
	res.render('figure8.html');
});

app.get('/recordvisit', function(req, res) {
	res.render('figure15.html');
});

app.get('/sendmessagetodoctor', function(req, res) {
	res.render('figure17a.html');
});

app.get('/sendmessagetopatient', function(req, res) {
	res.render('figure17b.html');

});

// Figure 3. Patient Profile
app.get('/patientprofile/submitNewProfile', function(req, res) {
	console.log('Submitting a new patient profile to the server.');
	connection.connect();
	
});

app.get('/patientprofile/test', function(req, res) {
	console.log('Sup');
	connection.connect();
	connection.query('SELECT * FROM User', function(err, rows, fields) {
		if (err) throw err;

		console.log('The username of the first row: ', rows[0].Username);
	});
	connection.end();
	res.send('good');
});

// End Routes

console.log("Server started at port 8000.");

app.listen(8000);