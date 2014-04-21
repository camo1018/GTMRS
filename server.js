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

app.get('/patienthome', function(req, res) {
	res.render('figure5.html');
});

app.get('/makeappointment', function(req, res) {
	res.render('figure6.html');
});

app.get('/ordermedication', function(req, res) {
	res.render('figure7.html');
});

app.get('/paymentinfo', function(req, res) {
	res.render('figure8.html');
});

app.get('/rate', function(req, res) {
	res.render('figure10.html');
});	

app.get('/visithistory', function(req, res) {
	res.render('figure9.html');
});

app.get('/ratedoctor', function(req, res) {
	res.render('figure10.html');
});

app.get('/doctorhome', function(req, res) {
	res.render('figure11.html');
});

app.get('/dailyappointmentscalendar', function(req, res) {
	res.render('figure12.html');
});

app.get('/monthlyappointmentscalendar', function(req, res) {
	res.render('figure13.html');
});

app.get('/patientvisithistory', function(req, res) {
	res.render('figure14.html');
});

app.get('/recordvisit', function(req, res) {
	res.render('figure15.html');
});	

app.get('/surgeryrecord', function(req, res) {
	res.render('figure16.html');
});

app.get('/sendmessagetodoctor', function(req, res) {
	res.render('figure17a.html');
});

app.get('/sendmessagetopatient', function(req, res) {
	res.render('figure17b.html');

});

app.get('/inbox', function(req, res) {
	res.render('figure18.html');

});

app.get('/adminhome', function(req, res) {
	res.render('figure19.html');

});

app.get('/billing', function(req, res) {
	res.render('figure20.html');

});

app.get('/docreport', function(req, res) {
	res.render('figure21.html');

});

app.get('/surgeryreport', function(req, res) {
	res.render('figure22.html');

});

app.get('/patientreport', function(req, res) {
	res.render('figure23.html');

});

// Figure 3. Patient Profile
app.get('/patientprofile/submitNewProfile', function(req, res) {
	console.log('Submitting a new patient profile to the server.');
	var username = req.query.username;
	var name = req.query.name;
	var dob = req.query.dob;
	var gender = req.query.gender;
	var address = req.query.address;
	var homePhone = req.query.homePhone;
	var workPhone = req.query.workPhone;
	var emergencyName = req.query.emergencyName;
	var emergencyPhone = req.query.emergencyPhone;
	var weight = req.query.weight;
	var height = req.query.height;
	var income = req.query.income;
	var allergies = req.query.allergies;

	connection.connect();
	var query = 'INSERT INTO Patient VALUES (\'' + username + '\', \'' + name + '\', \'' + dob + '\', \'' + gender + '\', \'' + address + '\', \'' + homePhone + '\', \''
		+ workPhone + '\', \'' + emergencyName + '\', \'' + emergencyPhone + '\', ' + weight + ', ' + height + ', ' + income + ', NULL)';
	console.log('Executing SQL\n' + query);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log('New Patient profile inserted');
	});
	var index;
	for (index = 0; index < allergies.length; ++index) {
		connection.query('INSERT INTO Allergies VALUES (\'' + username + '\', \'' + allergies[index] + '\')', function(err, rows, fields) {
			if (err) throw err;
			console.log('Allergy row inserted');
		});
	}
		
	connection.end();
	res.send('good');
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