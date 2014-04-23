// GTMRS NodeJS Server 
// Uses ExpressJS and EJS
// Paul Park

var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');

var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: 'CS4400'}));

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
	//req.session.username = "abc1234";
	//var username = req.session.username;
	//var data = { username:username };
	//res.render('index.html', { data:data });	
	res.send("Index");
});

app.get('/login', function(req, res) {
	res.render('figure1.html');
});

app.get('/register', function(req, res) {
	res.render('figure2.html');
});

app.get('/patientprofile', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure3.html', { data:data });
});

app.get('/doctorprofile', function(req, res) {
	res.render('figure4.html');
});

app.get('/patienthome', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure5.html', { data: data });
});

app.get('/makeappointment', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure6.html', { data: data });
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

// Figure-specific Functions

// Figure 1. Login
app.get('/login/loginUser', function(req, res) {
	console.log('Logging in user for ' + req.query.username);
	var username = req.query.username;
	var password = req.query.password;

	// Search for user in the database
	var query = 'SELECT * FROM User WHERE Username = \'' + username + '\' AND Password = \'' + password +'\'';
	console.log('Executing SQL\n' + query);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var user = '';
		if (rows.length > 0) {
			user += rows[0].Username;
			console.log('User [' + user + '] retrieved');
		}

		// User was found.
		if (user != '') {
			req.session.username = user;		
		}

		res.send(user);
	});
});

app.get('/login/getUserType', function(req, res) {
	console.log('Getting user type for user ' + req.query.username);
	var username = req.query.username;

	// Search for user in the database
	var query = 'SELECT (Username) FROM Patient WHERE Username = \'' + username + '\'';
	console.log('Executing SQL\n' + query);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0) {
			res.send('patient');
			return;			
		}
	});

	query = 'SELECT (Username) FROM Doctor WHERE Username = \'' + username + '\'';
	console.log('Executing SQL\n' + query);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0) {
			res.send('doctor');
			return;			
		}
	});

	query = 'SELECT (Username) FROM Admin WHERE Username = \'' + username + '\'';
	console.log('Executing SQL\n' + query);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0) {
			res.send('admin');
			return;			
		}
	});
});

// Figure 2. Registers
app.get('/register/newuser', function(req, res) {
	console.log("Registering a new user.");
	var username = req.query.username;
	var password = req.query.password;
	var userType = req.query.userType;

	var query = 'SELECT * FROM User WHERE Username = \'' + username + '\'');
	connection.query(query, function(err1, rows1, fields1) {
		if (rows1.length > 0) {
			console.log('User already exists!');
			res.send('bad');
			return;
		}

		var subquery = 'INSERT INTO User VALUES (\'' + username + '\', \'' + password + '\')';
		console.log('Executing SQL\n' + query);
		connection.query(subquery, function(err, rows, fields) {
			if (err) throw err;
			console.log('New user registered.');
		});

		if (userType == 'patient')
			subquery = 'INSERT INTO Patient (Username) VALUES (\'' + username + '\')';
		else if (userType == 'doctor')
			subquery = 'INSERT INTO Doctor (Username) VALUES (\'' + username + '\')';
		else
			subquery = 'INSERT INTO Admin (Username) VALUES (\'' + username + '\')';
		
		connection.query(subquery, function(err, rows, fields) {
			if (err) throw err;
			console.log('New user userType registered.');
			if (userType == 'patient')
				res.send('patient');
			else if (userType == 'doctor')
				res.send('doctor');
			else
				res.send('admin');
		});
	});
	
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
	res.send('good');
});

app.get('/patientprofile/test', function(req, res) {
	console.log('Sup');
	connection.query('SELECT * FROM User', function(err, rows, fields) {
		if (err) throw err;

		console.log('The username of the first row: ', rows[0].Username);
	});
	res.send('good');
});

// End Routes

console.log("Server started at port 8000.");

app.listen(8000);