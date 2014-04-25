// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {
	var doctorsArray = [];

	function sayHi() {
		alert('hi');
	}

	function getDayOfWeek(dayInt) {
		switch (parseInt(dayInt)) {
			case 1:
				return 'Sunday';
				break;
			case 2:
				return 'Monday';
				break;
			case 3:
				return 'Tuesday';
				break;
			case 4:
				return 'Wednesday';
				break;
			case 5:
				return 'Thursday';
				break;
			case 6:
				return 'Friday';
				break;
			case 7:
				return 'Saturday';
				break;
			default:
				return 'ERROR';
				break;
		}
	}

	function displayTable(doctors) {
		doctorsArray = doctors;
		$('#doctorsTable').empty();
		$('#doctorsTable').append('<tr><td>Doctor Name</td><td>Phone Number</td><td>Room Number</td><td>Availability</td><td>Average Rating</td></tr>');

		var index;
		for (index = 0; index < doctorsArray.length; ++index) {
			var doctor = doctors[index];
			console.log(doctor);
			if (doctor.availability.length > 0) {
				$('#doctorsTable').append('<tr id=' + doctor.username + '><td id="name">Dr. ' + doctor.fName + ' ' + doctor.lName + '</td>' +
				      '<td id="wPhone">' + doctor.wPhone + '</td>' +
				      '<td id="roomNo"># ' + doctor.roomNo + '</td>' +
				      '<td id="availability">' + getDayOfWeek(doctor.availability[0].day) + ': ' + doctor.availability[0].from + ' - ' + doctor.availability[0].to + 
				      	'<input type="checkbox" name="appointment" value="1" id=' + index + '|' + 0 + ' class="apptCheckbox"></td>' +
				      '<td id="avgRating">' + doctor.avgRating + '</td></tr>');
				if (doctor.availability.length > 1) {
					var i;
					for (i = 1; i < doctors.length; ++i) {
						$('#doctorsTable').append('<tr id=' + doctor.username + '><td id="name"></td>' +
				      '<td id="wPhone"></td>' +
				      '<td id="roomNo"></td>' +
				      '<td id="availability">' + getDayOfWeek(doctor.availability[i].day) + ': ' + doctor.availability[i].from + ' - ' + doctor.availability[i].to + 
				      	'<input type="checkbox" name="appointment" value="1" id=' + index + '|' + i + ' class="apptCheckbox"></td>' +
				      '<td id="avgRating"></td></tr>')
					}
				}
			}
			else {
				$('#doctorsTable').append('<tr id=' + doctor.username + '><td id="name">Dr. ' + doctor.fName + ' ' + doctor.lName + '</td>' +
				      '<td id="wPhone">' + doctor.wPhone + '</td>' +
				      '<td id="roomNo"># ' + doctor.roomNo + '</td>' +
				      '<td id="availability"></td>' +
				      '<td id="avgRating">' + doctor.avgRating + '</td></tr>');	
			}
		}
	}

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	$('#searchButton').on('click', function() {
		var specialty = $('#specialtyOption').val();
		var parameters = { specialty: specialty };
		$.get('/makeappointment/getDoctors', parameters, function(data) {
			var doctors = data;
			var newDoctors = [];
			var index;
			for (index = 0; index < doctors.length; ++index) {
				var doctor = { username:doctors[index].username, fName:doctors[index].fName, lName:doctors[index].lName, 
					wPhone:doctors[index].wPhone, roomNo:doctors[index].roomNo, availability: [], avgRating: null };
				var subParameters = { username:doctor.username };
				(function (doctor, keepIndex, subParameters) {
					$.get('/makeappointment/getAvailability', subParameters, function(subData) {
						doctor.availability = subData;
						$.get('/makeappointment/getAverageRating', subParameters, function(averageRating) {
							doctor.avgRating = averageRating;
							newDoctors.push(doctor);
							if (keepIndex >= doctors.length-1) {
								displayTable(newDoctors);
							}
						});
					});
				})(doctor, index, subParameters);
			}
		});
	});

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#reqbutton').bind('click', function() {
		$('.validationError').hide();
		// Validation
		var validationError = false;

		var appointments = [];

		var noChecks = true;
		$('.apptCheckbox').each(function() {
			if ($(this).is(':checked')) {
				noChecks = false;
				var doctorIndex = $(this).attr('id').split('|')[0];
				var availabilityIndex = $(this).attr('id').split('|')[1];
				var dUsername = doctorsArray[doctorIndex].username;
				var date = Date.parse('next ' + getDayOfWeek(doctorsArray[doctorIndex].availability[availabilityIndex].day)).toString('yyyy-MM-dd');
				var from = doctorsArray[doctorIndex].availability[availabilityIndex].from;
				var to = doctorsArray[doctorIndex].availability[availabilityIndex].to;
				var appointment = { dUsername: dUsername, date: date, from: from, to: to };
				appointments.push(appointment);
				document.location = 'patienthome';
			}
		})

		if (noChecks) {
			$('#checkValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		console.log(appointments);
		var pUsername = serverData.username;
		var parameters = { pUsername: pUsername, appointments: appointments };
		$.get('/makeappointment/requestAppointment', parameters, function(data) {
			if (data == 'good') {
				document.location = 'patienthome';
			}
			else if (data == 'partial') {
				document.location = 'makeappointment';
			}
			else {
				document.location = 'makeappointment';
			}
		});

	});


});