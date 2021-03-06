// GTMRS NodeJS Server 
// Uses ExpressJS and EJS
// Paul Park

var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');
var dateFormat = require('dateformat');

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
	var data = { username:req.session.username };
	res.render('figure4.html', { data:data });
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
	var data = { username:req.session.username };
	res.render('figure7.html', { data: data });
});

app.get('/paymentinfo', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure8.html', { data: data });
});

app.get('/visithistory', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure9.html', { data: data });
});

app.get('/rate', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure10.html', { data: data });
});	

app.get('/doctorhome', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure11.html', { data: data });
});

app.get('/dailyappointmentscalendar', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure12.html', { data: data });
});

app.get('/monthlyappointmentscalendar', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure13.html', { data: data });
});

app.get('/patientvisithistory', function(req, res) {
	var data = { username: req.session.username };
	res.render('figure14.html', { data: data });
});

app.get('/recordvisit', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure15.html', { data: data });
});	

app.get('/surgeryrecord', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure16.html', { data: data });
});

app.get('/sendmessagetodoctor', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure17a.html', { data: data });
});

app.get('/sendmessagetopatient', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure17b.html', { data: data});

});

app.get('/inbox', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure18.html', { data: data});

});

app.get('/adminhome', function(req, res) {
	res.render('figure19.html');

});

app.get('/billing', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure20.html',  { data: data});

});

app.get('/docreport', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure21.html',  { data: data});

});

app.get('/surgeryreport', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure22.html', { data: data});

});

app.get('/patientreport', function(req, res) {
	var data = { username:req.session.username };
	res.render('figure23.html', { data: data});

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

	var query = 'SELECT * FROM User WHERE Username = \'' + username + '\'';
	connection.query(query, function(err1, rows1, fields1) {
		if (rows1.length > 0) {
			console.log('User already exists!');
			res.send('User already exists!');
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
			// Login as the newly registered user.
			req.session.username = username;
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
	var query = 'UPDATE Patient SET Name = \'' + name + '\', Dob = \'' + dob + '\', Gender = \'' 
		+ gender + '\', Address = \'' + address + '\', Hphone = \'' + homePhone + '\', Wphone = \'' + workPhone + '\', EmergencyName = \'' + emergencyName +
		'\', EmergencyPhone = \'' + emergencyPhone + '\', Weight = ' + weight + ', Height = ' + height + ', Income = ' + income + ' WHERE Username = \'' + username + '\'';
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

// Figure 4.  Doctor Profile
app.get('/doctorprofile/submitDocProfile', function(req, res) {
	console.log('Submitting a new doctor profile to the server.');
	var username = req.query.username;
	var licenseNum = req.query.licenseNum;
	var fname = req.query.fname;
	var lname = req.query.lname;
	var dob = req.query.dob;
	var wPhone = req.query.wPhone;
	var spec = req.query.spec;
	var roomNum = req.query.roomNum;
	var address = req.query.address;
	var availability = req.query.availability;

	var query = 'UPDATE Doctor SET FirstName=\'' + fname + '\', LastName=\'' + lname + '\', LicenseNumber=\'' + licenseNum + '\', Dob=\'' +
		dob + '\', HomeAddress=\'' + address + '\', WorkPhone=\'' + wPhone + '\', Specialty=\'' + spec + '\', RoomNo=\'' + roomNum + '\' WHERE Username=\''
		+ username +'\'';

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log('Doctor profile updated for user ' + username);
	})

	// First, delete all pre-existing rows of Availability.
	query = 'DELETE FROM Availability WHERE DUsername=\'' + username + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var index;
		for (index = 0; index < availability.length; ++index) {
			var subQuery = 'INSERT INTO Availability VALUES(\'' + username + '\', \'' + availability.day + '\', \'' + availability.from + '\'';
			connection.query(subQuery, function(err, rows, fields) {
				if (err) throw err;
			});
		}
	});
});

// Figure 5. Patient Homepage
app.get('/patienthome/getMessageCount', function(req, res) {
	console.log('Getting message count from the server.');
	var username = req.query.username;
	var query = 'SELECT COUNT(*) AS Count FROM Sends_Message_To_Patient WHERE ReceiverPUsername = \'' + username +'\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var count = rows[0].Count;
		res.send(''+count);
		console.log("Returning count " + count);
	});
});

// Figure 6. Make Appointment
app.get('/makeappointment/getDoctors', function(req, res) {
	var specialty = req.query.specialty;
	console.log('Getting Doctors matching Criteria.');
	var query = 'SELECT Username, FirstName, LastName, WorkPhone, RoomNo FROM Doctor WHERE Specialty = \'' + specialty + '\'';
	var doctors = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var index;
		for (index = 0; index < rows.length; ++index) {
			var doctor = { username: rows[index].Username, fName: rows[index].FirstName, lName: rows[index].LastName, wPhone: rows[index].WorkPhone, roomNo: rows[index].RoomNo };
			doctors.push(doctor);
		}
		res.json(doctors);
	});
});

app.get('/makeappointment/getAvailability', function(req, res) {
	var availability = [];
	var username = req.query.username;
	var query = 'SELECT * FROM Availability as A WHERE DUsername = \'' + username + '\' AND A.DUsername NOT IN (SELECT DUsername FROM RequestAppointment as R WHERE R.DUsername=A.DUsername AND A.From = R.Time AND A.Day = DAYOFWEEK(R.Date))';
	connection.query(query, function(err, rows, fields) {
		var index;
		for (index = 0; index < rows.length; ++index) {
			var timeSlot = { day:rows[index].Day, from:rows[index].From, to:rows[index].To };
			availability.push(timeSlot);
		}
		res.json(availability);
	});
});

app.get('/makeappointment/getAverageRating', function(req, res) {
	var username = req.query.username;
	var query = 'SELECT AVG(Rating) As AvgRating FROM Rates WHERE DUsername = \'' + username + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var avgRating = rows[0].AvgRating;
		res.send(''+avgRating);
	})
});

app.get('/makeappointment/requestAppointment', function(req, res) {
	var pUsername = req.query.pUsername;
	var appointments =req.query.appointments;

	// First compare appointments and make sure there are no overlaps.
	var i;
	var j;
	for (i = 0; i < appointments.length; ++i) {
		for (j = i + 1; j < appointments.length; ++j) {
			if (appointments[i].date == appointments[j].date && (appointments[i].from <= appointments[j].to && appointments[j].from <= appointments[i].to)) {
				res.send('bad');
				return;
			}
		}
	}
	for (i = 0; i < appointments.length; ++i) {
		var query = 'INSERT INTO RequestAppointment VALUES (\'' + pUsername + '\', \'' + appointments[i].dUsername + '\', \'' 
			+ appointments[i].date + '\', \'' + appointments[i].from + '\')';
		connection.query(query, function(err, rows, fields) {
			if (err) throw (err)
		});
	}
})

// Figure 7. Order Medication
app.get('/ordermedication/check', function(req, res) {
	var username = req.query.username;
	var medication = req.query.medication;
	var dosage = req.query.dosage;
	var duration = req.query.duration;
	var dFirstName = req.query.doctorFirstName;
	var dLastName = req.query.doctorLastName;
	var pdate = req.query.pdate;

	var query = 'SELECT * FROM Prescription WHERE VisitDate=\'' + pdate + '\' AND PUsername=\'' + username + 
		'\' AND DUsername IN (SELECT Username FROM Doctor WHERE FirstName=\'' + 
		dFirstName + '\' AND LastName=\'' + dLastName + '\') AND MedicineName=\'' + medication + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0)
			res.send('good');
		else
			res.send('bad');
	});
});

app.get('/ordermedication/checkout', function(req, res) {
	var username = req.query.username;
	var medication = req.query.medication;
	var dosage = req.query.dosage;
	var duration = req.query.duration;
	var dFirstName = req.query.doctorFirstName;
	var dLastName = req.query.doctorLastName;
	var pdate = req.query.pdate;

	var query = 'UPDATE Prescription SET Status=\'Paid\' WHERE VisitDate=\'' + pdate + '\' AND PUsername=\'' + username + 
		'\' AND DUsername IN (SELECT Username FROM Doctor WHERE FirstName=\'' + 
		dFirstName + '\' AND LastName=\'' + dLastName + '\') AND MedicineName=\'' + medication + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
	});
});

// Figure 8. Payment Info
app.get('/paymentinfo/checkExistingPaymentInfo', function(req, res) {
	var username = req.query.username;

	var query = 'SELECT PaymentCardNumber FROM Patient WHERE Username=\'' + username +'\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var cardNumber = rows[0].PaymentCardNumber;
		if (cardNumber == null) {
			res.send('none');
		}
		else {
			res.send('exists');
		}
	});
});

app.get('/paymentinfo/order', function(req, res) {
	var username = req.query.username;
	var cName = req.query.cName;
	var cNumber = req.query.cNumber;
	var cType = req.query.cType;
	var cvv = req.query.cvv;
	var doe = req.query.doe;

	var query = 'INSERT INTO PaymentInformation VALUES (\'' + cName + '\', \'' + cNumber + '\', \'' + cType + '\', \'' + cvv + '\', \'' + doe + '\')';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
	});

	query = 'UPDATE Patient SET PaymentCardNumber=\'' + cNumber + '\' WHERE Username=\'' + username + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
	});

	res.send('good');

});

// Figure 9.  Visit History
app.get('/visithistory/getVisits', function(req, res) {
	var username = req.query.username;

	var query = 'SELECT * FROM Visit WHERE PUsername = \'' + username + '\'';
	var visits = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		for (var i = 0; i < rows.length; i++) {
			var visit = { pUsername: username, dUsername: rows[i].DUsername, visitDate: dateFormat(rows[i].VisitDate, "yyyy-mm-dd" ),
				diastolic: rows[i].Diastolic, systolic: rows[i].Systolic, billingAmount: rows[i].BillingAmount, diagnoses: null, prescriptions: null };
			var query2 = 'SELECT Diagnosis FROM Diagnosis WHERE VisitDate=\'' + visit.visitDate + '\' AND PUsername = \'' + visit.pUsername +
				'\' AND DUsername = \'' + visit.dUsername + '\'';
			(function (i, visit, query2) {
				connection.query(query2, function(err2, rows2, fields2) {
					var diagnoses = [];
					if (err2) throw err2;
					console.log(rows2.length);
					for (var j = 0; j < rows2.length; j++) {
						diagnoses.push(rows2[j].Diagnosis);
					}
					visit.diagnoses = diagnoses;
					var query3 = 'SELECT * FROM Prescription WHERE VisitDate=\'' + visit.visitDate + '\' AND PUsername = \'' + visit.pUsername +
						'\' AND DUsername = \'' + visit.dUsername + '\'';
					connection.query(query3, function(err3, rows3, fields3) {
						var prescriptions = [];
						if (err3) throw err3;
						for (var k = 0; k < rows3.length; k++) {
							var prescription = { medicineName: rows3[k].MedicineName, dosage: rows3[k].Dosage, duration: rows3[k].Duration, notes: rows3[k].Notes };
							prescriptions.push(prescription);
						}
						visit.prescriptions = prescriptions;
						visits.push(visit);
						if (i >= rows.length - 1)
							res.json(visits);
					});
				});
			})(i, visit, query2);
		}
	});
});

app.get('/visithistory/getDoctorName', function(req, res) {
	var dUsername = req.query.dUsername;

	var query = 'SELECT FirstName, LastName FROM Doctor WHERE Username = \'' + dUsername + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var name = rows[0].FirstName + ' ' + rows[0].LastName;
		res.send(name);
	})
});

// Figure 10.  Rate a Doctor
app.get('/rate/submitRating', function(req, res) {
	var dUsername = req.query.dUsername;
	var pUsername = req.query.pUsername;
	var rating = req.query.rating;

	var query1 = 'DELETE FROM Rates WHERE DUsername = \'' + dUsername + '\' AND PUsername = \'' + pUsername + '\'';
	var query2 = 'INSERT INTO Rates VALUES (\'' + dUsername + '\', \'' + pUsername + '\', \'' + rating + '\')';

	connection.query(query1, function(err, rows, fields) {
		if (err) throw err;
		connection.query(query2, function(err, rows, fields) {
		if (err) throw err;
		res.send('good');
	});
	});
});

app.get('/rate/getDoctors', function(req, res) {
	var pUsername = req.query.pUsername;

	var query = 'SELECT Username, FirstName, LastName FROM Doctor, Visit WHERE Doctor.Username = Visit.DUsername AND \'' + pUsername + '\' = Visit.PUsername';
	var doctors = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var resultUsername = rows[i].Username;
			var resultFName = rows[i].FirstName;
			var resultLName = rows[i].LastName;
			var doctor = { username: resultUsername, fName: resultFName, lName: resultLName };
			doctors.push(doctor);
		}
		res.json(doctors);
	});
})

// Figure 11. Doctor Homepage
app.get('/doctorhome/getMessageCount', function(req, res) {
	console.log('Getting message count from the server.');
	var username = req.query.username;
	var query = 'SELECT COUNT(*) AS Count FROM Sends_Message_To_Doctor WHERE ReceiverDUsername = \'' 
		+ username + '\' UNION ALL SELECT COUNT(*) AS Count FROM Communicates WHERE ReceiverUsername = \'' + username + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var count = rows[0].Count;
		var count2 = rows[1].Count;
		res.send(''+(parseInt(count)+parseInt(count2)));
	});
});

// Figure 12. Appointments for Selected Date.
app.get('/dailyappointmentscalendar/getAppointments', function(req, res) {
	var dUsername = req.query.dUsername;
	var date = dateFormat(req.query.date, 'yyyy-mm-dd');
	console.log(date);

	var query = 'SELECT P.Username as Username, P.Name as Name, A.Time as Time FROM Patient as P, RequestAppointment as A WHERE P.Username = A.PUsername AND A.Date = \'' + 
		dateFormat(date, 'yyyy-mm-dd') + '\' AND A.DUsername = \'' + dUsername + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(query);
		var patients = [];
		for (var i = 0; i < rows.length; i++) {
			var pUsername = rows[i].Username;
			var pName = rows[i].Name;
			var time = rows[i].Time;
			var patient = { username: pUsername, name: pName, time: time};
			patients.push(patient);
		}
		res.json(patients);
	});
});

app.get('/dailyappointmentscalendar/getTimeRange', function(req, res) {
	var dUsername = req.query.dUsername;
	var time = req.query.time;

	var query = 'SELECT `From` as F, `To` as T FROM Availability WHERE DUsername = \'' + dUsername + '\' AND `From` = \'' + time + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0) {
			var time = { from: rows[0].F, to: rows[0].T };
			res.send(time);
		}
	});
});

// Figure 13.  Appointments for the Month
app.get('/monthlyappointmentscalendar/getAppointments', function(req, res) {
	var dUsername = req.query.dUsername;

	var query = 'SELECT Date, Count(*) as Count FROM RequestAppointment WHERE DUsername = \'' + dUsername + '\' GROUP BY Date';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var dateCounts = [];
		for (var i = 0; i < rows.length; i++) {
			var dateCount = { date: dateFormat(rows[i].Date, 'yyyy-mm-dd'), count: rows[i].Count };
			dateCounts.push(dateCount);
		}
		res.json(dateCounts);
	});
});

// Figure 14. Patient Visit History
app.get('/patientvisithistory/searchPatientByName', function(req, res) {
	var dUsername = req.query.dUsername;
	var name = req.query.name;

	var query = 'SELECT P.Username as Username, P.Name as Name, P.Hphone as Phone FROM Patient as P, Visit as V WHERE P.Username = V.PUsername AND P.Name = \'' 
		+ name + '\' AND V.DUsername = \'' + dUsername + '\'';

	var patients = [];

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		for (var i = 0; i < rows.length; i++) {
			var username = rows[i].Username;
			var phone = rows[i].Phone;
			var name = rows[i].Name;
			var patient = { username: username, name: name, phone: phone };
			patients.push(patient);
		}
		res.json(patients);
	});
});

app.get('/patientvisithistory/searchPatientByPhone', function(req, res) {
	var dUsername = req.query.dUsername;
	var phone = req.query.phone;

	var query = 'SELECT P.Username as Username, P.Name as Name, P.Hphone as Phone FROM Patient as P, Visit as V WHERE P.Username = V.PUsername AND P.Hphone = \'' 
		+ phone + '\' AND V.DUsername = \'' + dUsername + '\'';

	var patients = [];

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		for (var i = 0; i < rows.length; i++) {
			var username = rows[i].Username;
			var name = rows[i].Name;
			var phone = rows[i].Phone;
			var patient = { username: username, name: name, phone: phone };
			patients.push(patient);
		}
		res.json(patients);
	});
});

app.get('/patientvisithistory/searchPatientByNamePhone', function(req, res) {
	var dUsername = req.query.dUsername;
	var name = req.query.name;
	var phone = req.query.phone;

	var query = 'SELECT P.Username as Username, P.Name as Name, P.Hphone as Phone FROM Patient as P, Visit as V WHERE P.Username = V.PUsername AND P.Name = \'' 
		+ name + '\' AND P.Hphone = \'' + phone + '\' AND V.DUsername = \'' + dUsername + '\'';

	var patients = [];

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		for (var i = 0; i < rows.length; i++) {
			var username = rows[i].Username;
			var name = rows[i].Name;
			var phone = rows[i].Phone;
			var patient = { username: username, name: name, phone: phone };
			patients.push(patient);
		}
		res.json(patients);
	});
});

app.get('/patientvisithistory/getPatientVisits', function(req, res) {
	var pUsername = req.query.pUsername;
	var dUsername = req.query.dUsername;

	var query = 'SELECT * FROM Visit WHERE PUsername = \'' + pUsername + '\' AND DUsername = \'' + dUsername + '\'';
	var visits = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		for (var i = 0; i < rows.length; i++) {
			var visit = { visitDate: rows[i].VisitDate, diastolic: rows[i].Diastolic, systolic: rows[i].Systolic, 
				billingAmount: rows[i].BillingAmount, diagnoses: null, prescriptions: null };
			console.log(dateFormat(visit.visitDate, 'yyyy-mm-dd'));

			var query2 = 'SELECT Diagnosis FROM Diagnosis WHERE VisitDate=\'' + dateFormat(visit.visitDate, 'yyyy-mm-dd') + '\' AND PUsername = \'' + pUsername +
				'\' AND DUsername = \'' + dUsername + '\'';
			(function (i, query2, visit) {
				connection.query(query2, function(err2, rows2, fields2) {
					var diagnoses = [];
					if (err2) throw err2;
					for (var j = 0; j < rows2.length; j++) {
						diagnoses.push(rows2[j].Diagnosis);
					}
					visit.diagnoses = diagnoses;
					var query3 = 'SELECT * FROM Prescription WHERE VisitDate=\'' + dateFormat(visit.visitDate, 'yyyy-mm-dd') + '\' AND PUsername = \'' + pUsername +
						'\' AND DUsername = \'' + dUsername + '\'';
					connection.query(query3, function(err3, rows3, fields3) {
						var prescriptions = [];
						if (err3) throw err3;
						for (var k = 0; k < rows3.length; k++) {
							var prescription = { medicineName: rows3[k].MedicineName, dosage: rows3[k].Dosage, duration: rows3[k].Duration, notes: rows3[k].Notes };
							prescriptions.push(prescription);
						}
						visit.prescriptions = prescriptions;
						visits.push(visit);
						if (i >= rows.length - 1)
							res.json(visits);
					});
				});
			})(i, query2, visit);
		}
	});

});

// Figure 15. Record Visits
app.get('/recordvisit/getPatients', function(req, res) {
	var username = req.query.username;

	var query = 'SELECT Username, Name FROM Patient, RequestAppointment WHERE Username = PUsername AND DUsername = \'' + username + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var patients = [];
		for (var i = 0; i < rows.length; i++) {
			var patient = { username: rows[i].Username, name: rows[i].Name };
			patients.push(patient);
		}
		res.json(patients);
	})
});

app.get('/recordvisit/record', function(req, res) {
	var dateOfVisit = req.query.dateOfVisit;
	var dUsername = req.query.dUsername;
	var pUsername = req.query.pUsername;
	var systolic = req.query.systolic;
	var diastolic = req.query.diastolic;
	var diagnoses = req.query.diagnoses;
	var prescriptions = req.query.prescriptions;

	var query = 'INSERT INTO Visit VALUES (\'' + dateOfVisit + '\', \'' + pUsername + '\', \'' + dUsername + '\', '  
		+ diastolic + ', '  + systolic + ', ' + 150 + ')'; 
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
	});

	for (var i = 0; i < diagnoses.length; i++) {
		console.log('Inserting diagnosis');
		query = 'INSERT INTO Diagnosis VALUES (\'' + dateOfVisit + '\', \'' + pUsername + '\', \'' + dUsername + '\', \'' + diagnoses[i] + '\')';
		(function (i, query) {
			connection.query(query, function(err, rows, fields) {
				if (err) throw err;
			});
		})(i, query);
	}

	for (var i = 0; i < prescriptions.length; i++) {
		console.log('Inserting prescription');
		query = 'INSERT INTO Prescription VALUES (\'' + dateOfVisit + '\', \'' + pUsername + '\', \'' + dUsername + '\', \'' +
			prescriptions[i].medname + '\', ' + prescriptions[i].dosage + ', ' + prescriptions[i].duration + ', \'' + prescriptions[i].notes + '\', \'Unpaid\')';
		(function (i, query) {
			connection.query(query, function(err, rows, fields) {
				if (err) throw err;
				res.send('good');
			});
		})(i, query);
	}

	query = 'DELETE FROM RequestAppointment WHERE DUsername = \'' + dUsername + '\' AND Date = \'' + dateOfVisit + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
	});
});

// Figure 16.  Surgery Record
app.get('/surgeryrecord/searchPatient', function(req, res) {
	var name = req.query.name;
	var query = 'SELECT * FROM Patient WHERE Name = \'' + name + '\'';
	var patients = [];
	connection.query(query, function(err, rows, fields) {
		for (var i = 0; i < rows.length; i++) {
			var patient = { username: rows[i].Username, name: rows[i].Name, phone: rows[i].Hphone };
			patients.push(patient);
		}
		res.json(patients);
	});
});

app.get('/surgeryrecord/getDoctorName', function(req, res) {
	var username = req.query.dUsername;
	var query = 'SELECT FirstName, LastName FROM Doctor WHERE Username = \'' + username + '\'';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0)
			res.send(rows[0].FirstName + ' ' + rows[0].LastName);
	});
});

app.get('/surgeryrecord/getSurgeries', function(req, res) {
	var query = 'SELECT * FROM Surgery';
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var surgeries = []
		for (var i = 0; i < rows.length; i++) {
			var surgery = { cptCode: rows[i].CPTCode, surgeryType: rows[i].SurgeryType, surgeryCost: rows[i].SurgeryCost };
			surgeries.push(surgery);
		}
		res.json(surgeries);
	});
});

app.get('/surgeryrecord/getPreops', function(req, res) {
	var cptCode = req.query.cptCode;

	var query = 'SELECT * FROM PreoperativeMedications WHERE CPTCode = ' + cptCode;
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		var meds = [];
		for (var i = 0; i < rows.length; i++) {
			var med = { medName: rows[i].MedicationName };
			meds.push(med);
		}
		res.json(meds);
	});
})

app.get('/surgeryrecord/recordSurgery', function(req, res) {
	var pUsername = req.query.pUsername;
	var dUsername = req.query.dUsername;
	var surgery = req.query.surgery;
	var numAssistants = req.query.numAssistants;
	var anesthesiaStartTime = req.query.anesthesiaStartTime;
	var surgeryStartTime = req.query.surgeryStartTime;
	var surgeryCompletionTime = req.query.surgeryCompletionTime;
	var complications = req.query.complications;

	var query = 'INSERT INTO Performs VALUES (' + surgery.cptCode + ', \'' + pUsername + '\', \'' + dUsername + '\', \'' + surgeryStartTime +
		'\', \'' + surgeryCompletionTime + '\', \'' + anesthesiaStartTime + '\', \'' + numAssistants + '\', \'' + complications + '\')';	
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		res.send('good');
	});

});

//Figure 17a. Send Message to Doctor
app.get('/sendmessagetodoctor/getDoctors', function(req, res) {
	var pUsername = req.query.pUsername;
	var query = 'SELECT Username, FirstName, LastName FROM Doctor';
	var doctors = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var resultUsername = rows[i].Username;
			var resultFName = rows[i].FirstName;
			var resultLName = rows[i].LastName;
			var doctor = { username: resultUsername, fName: resultFName, lName: resultLName };
			doctors.push(doctor);
		}
		res.json(doctors);
	});
});

function formatDate(date){
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDay();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	return (year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec);
};

app.get('/sendmessagetodoctor/sendMessage', function(req, res) {
	var dUsername = req.query.dUsername;
	var pUsername = req.query.pUsername;
	var message = req.query.message;
	var date = new Date();
	date = formatDate(date, "yyyy-MM-dd HH:mm:ss");

	var query = 'INSERT INTO Sends_Message_To_Doctor VALUES (\'' + pUsername + '\', \'' + dUsername + '\', \'' + date + '\', \'' + message + '\', \'Unread\')';

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		res.send('good');
	});


});

//Figure 17b. Send Message to Patient (or other Doctor)
app.get('/sendmessagetopatient/getPatients', function(req, res) {
	var dUsername = req.query.dUsername;
	var query = 'SELECT Username, Name, Hphone FROM Patient';
	var patients = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var resultUsername = rows[i].Username;
			var resultName = rows[i].Name;
			var Hphone = rows[i].Hphone
			var patient = { username: resultUsername, Name: resultName, Hphone: Hphone };
			patients.push(patient);
		}
		res.json(patients);
	});
});

app.get('/sendmessagetopatient/getDoctors', function(req, res) {
	var dUsername = req.query.dUsername;
	var query = 'SELECT Username, FirstName, LastName FROM Doctor';
	var doctors = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var resultUsername = rows[i].Username;
			var resultFName = rows[i].FirstName;
			var resultLName = rows[i].LastName;
			var doctor = { username: resultUsername, fName: resultFName, lName: resultLName };
			doctors.push(doctor);
		}
		res.json(doctors);
	});
});

app.get('/sendmessagetopatient/sendToPatient', function(req, res) {
	var dUsername = req.query.dUsername;
	var pUsername = req.query.pUsername;
	var message = req.query.message;
	var date = new Date();
	date = formatDate(date, "yyyy-MM-dd HH:mm:ss");

	var query = 'INSERT INTO Sends_Message_To_Patient VALUES (\'' + dUsername + '\', \'' + pUsername + '\', \'' + date + '\', \'' + message + '\', \'Unread\')';

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		res.send('good');
	});
});

app.get('/sendmessagetopatient/communicateDoctor', function(req, res) {
	var dUsername = req.query.dUsername;
	var RDUsername = req.query.receivingDUsername;
	var message = req.query.message;
	var date = new Date();
	date = formatDate(date, "yyyy-MM-dd HH:mm:ss");

	var query = 'INSERT INTO Communicates VALUES (\'' + dUsername + '\', \'' + RDUsername + '\', \'' + date + '\', \'' + message + '\', \'Unread\')';

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		res.send('good');
	});
});

////Figure 18. Inbox
app.get('/inbox/getUserType', function(req, res) {
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

app.get('/inbox/getMessagesPatient', function(req, res) {
	var username = req.query.username;

	// Search for user in the database
	var query = 'SELECT Status, DateTime, FirstName, LastName, Content FROM Sends_Message_To_Patient AS S, Doctor AS D WHERE S.ReceiverPUsername = \'' + 
		username + '\' AND S.SenderDUsername = D.Username';
	var messages = [];
	console.log('Executing SQL\n' + query);
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var Status = rows[i].Status;
			var DateTime = rows[i].DateTime;
			var DfName = rows[i].FirstName;
			var DlName = rows[i].LastName;
			var Message = rows[i].Content;
			var message = { DateTime:DateTime, DfName:DfName, DlName:DlName, Message:Message, Status:Status };
			messages.push(message);
		}
		res.json(messages);
	});
});

app.get('/inbox/getMessagesDoctor', function(req, res) {
	var username = req.query.username;

	// Search for user in the database
	var query1 = 'SELECT Status, DateTime, Name, Content FROM Sends_Message_To_Doctor AS S, Patient AS P WHERE S.ReceiverDUsername = \'' + 
		username + '\' AND S.SenderPUsername = P.Username';
	var query2 = 'SELECT Status, DateTime, FirstName, LastName, Content FROM Communicates AS C, Doctor AS D WHERE C.ReceiverUsername = \'' + 
		username + '\' AND C.SenderUsername = D.Username';
	var messages = [];
	connection.query(query1, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var Status = rows[i].Status;
			var DateTime = rows[i].DateTime;
			var PName = rows[i].Name;
			var Message = rows[i].Content;
			var message = { DateTime:DateTime, PName:PName, Message:Message, Status:Status };
			messages.push(message);
		}
		connection.query(query2, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows.length);
			for (var i = 0; i < rows.length; i++ ) {
				var Status = rows[i].Status;
				var DateTime = rows[i].DateTime;
				var SfName = rows[i].FirstName;
				var SlName = rows[i].LastName;
				var PName = 'Dr. ' + SfName + ' ' + SlName;
				var Message = rows[i].Content;
				var message = { DateTime:DateTime, PName:PName, Message:Message, Status:Status };
				messages.push(message);
			}
			res.json(messages);
		});
	});
});

// Figure 20. Billing Report
app.get('/billing/searchPatient', function(req, res) {
	var username = req.query.pname;

	var query = 'SELECT Name, Hphone, Username FROM Patient WHERE \'' + username + '\' = Name';
	var patients = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var Name = rows[i].Name;
			var Hphone = rows[i].Hphone;
			var Username = rows[i].Username;
			var patient = { Name:Name, Hphone:Hphone, Username:Username };
			patients.push(patient);
		}
		res.json(patients);

	});
});

app.get('/billing/createTable', function(req, res) {
	var username = req.query.pname;

	var query = 'SELECT * FROM VisitBill WHERE \'' + username + '\'= Pusername';
	var bill = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var Pusername = rows[i].Pusername;
			var vdate = rows[i].VisitDate;
			var vcost = rows[i].VisitCost;
			var sname = rows[i].SurgeryName;
			var scost = rows[i].SurgeryCost;
			var tcost = rows[i].TotalAmount;
			var Row = { Pusername:Pusername, vcost:vcost, sname:sname, scost:scost, tcost:tcost, vdate:vdate };
			bill.push(Row);
		}
		res.json(bill);

	});
});


// Figure 21. Doctor Performance Report
app.get('/docreport/createTable', function(req, res) {
	var username = req.query.username;

	var query = 'SELECT * FROM DoctorReport';
	var docReport = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var specialty = rows[i].Specialty;
			var avgRating = rows[i].AverageRating;	
			var NoSurgeries = rows[i].NumberOfSurgeries;
			var Row = { specialty:specialty, avgRating:avgRating, NoSurgeries:NoSurgeries };
			docReport.push(Row);
			}
		res.json(docReport);
	});
});

// Figure 22. Surgery Report
app.get('/surgeryreport/createTable', function(req, res) {
	var username = req.query.username;

	var query = 'SELECT * FROM SurgeriesReport';
	var surReport = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var Stype = rows[i].SurgeryType;
			var CPT = rows[i].CPTCode;	
			var NoProcedures = rows[i].NoOfProcedures;
			var NoDoctors = rows[i].NoOfDoctors;
			var Billing = rows[i].TotalBilling;
			var Row = { Stype:Stype, CPT:CPT, NoProcedures:NoProcedures, NoDoctors:NoDoctors, Billing: Billing };
			surReport.push(Row);
			}
		res.json(surReport);
	});
});

// Figure 23. Patient Visit Report
app.get('/patientreport/createTable', function(req, res) {
	var username = req.query.username;
	//var month = req.query.month;
	//var year = req.query.year;

	var query = 'SELECT * FROM PatientVisit';
	var patientReport = [];
	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		for (var i = 0; i < rows.length; i++ ) {
			var doc = rows[i].Doctor;
			var NoPatients = rows[i].NoOfPatientsSeen;	
			var NoPrescriptions = rows[i].NoOfPrescriptionsWritten;
			var Billing = rows[i].TotalBilling;
			var Vdate = rows[i].VDate;
			var Row = { doc:doc, NoPatients:NoPatients, NoPrescriptions:NoPrescriptions, Billing: Billing, Vdate:Vdate };
			patientReport.push(Row);
			}
		res.json(patientReport);
	});
});


// TEST
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