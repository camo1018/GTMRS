// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var dUsername = serverData.username;

	var visits;

	function populateSearchResult(patients) {
		$('#patientResultsTable').empty();
		$('#patientResultsTable').append('<tr><td>Patient Name</td><td>Phone Number</td><td></td</tr>');
		for (var i = 0; i < patients.length; i++) {
			$('#patientResultsTable').append('<tr><td>' + patients[i].name + '</td><td>' + patients[i].phone + '</td>' +
				'<td id="td_' + i + '"><button class="viewButton" type="button" id="' + i + '">View</button><button class="recordButton" type="button" id="' + i + '">Record a Visit</button></td>');
		}
		$('.recordButton').on('click', function() {
			document.location = 'recordvisit';
		});
		$('.viewButton').on('click', function() {
			var indix = $(this).attr('id');
			var pUsername = patients[indix].username;
			var params = { pUsername: pUsername, dUsername: dUsername };
			$.get('/patientvisithistory/getPatientVisits', params, function(data) {
				visits = data;
				$('#visitDateTable').empty();
				for (var i = 0; i < visits.length; i++) {
					$('#visitDateTable').append('<tr><td><button type="button" style="width:130px" class="visitDateButton" id="'+i+'">' + 
						visits[i].visitDate.substring(0, 10) + '</button></td></tr>');
				}
				$('.visitDateButton').on('click', function() {
					console.log('hi');
					var index = $(this).attr('id');
					$('#visitDate').val(visits[index].visitDate.substring(0, 10));
					$('#systolic').val(visits[index].systolic);
					$('#diastolic').val(visits[index].diastolic);
					$('#diagnoses').empty();
					for (var i = 0; i < visits[index].diagnoses.length; i++) {
						$('#diagnoses').append('<option>'+visits[index].diagnoses[i]+'</option>');
					}
					$('#prescriptionsTable').empty();
					$('#prescriptionsTable').append('<tr>' +
									        '<td style="width:150px">Medicine Name</td>' +
									        '<td style="width:100px">Dosage</td>' +
									        '<td style="width:80px">Duration</td>' +
									        '<td style="width:300px">Notes</td>' +
									      	'</tr>');	
					for (var i = 0; i < visits[index].prescriptions.length; i++) {
						$('#prescriptionsTable').append('<tr><td style="width:150px">' + visits[index].prescriptions[i].medicineName +
							'</td><td style="width:100px">' + visits[index].prescriptions[i].dosage + '</td><td style="width:80px">' + 
							visits[index].prescriptions[i].duration + '</td><td style="width:300px">' + visits[index].prescriptions[i].notes + '</td></tr>');
					}
				});
			});
		});
	} 

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#searchButton').bind('click', function() {
		var name = $('#Name').val();
		var phone = $('#phoneNum').val();


		// Validation
		var validationError = false;

		$('.validationError').hide();
		if ((name == '') && (phone == '')) {
			$('#namephoneValidationError').show();
			validationError = true;
		}


		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		if (name == '') {
			var parameters = { dUsername: dUsername, phone: phone }
			$.get('/patientvisithistory/searchPatientByPhone', parameters, function(data) {
				populateSearchResult(data);
			});
		}
		else if (phone == '' ) {
			var parameters = { dUsername: dUsername, name: name };
			$.get('/patientvisithistory/searchPatientByName', parameters, function(data) {
				populateSearchResult(data);
			});
		}
		else {
			var parameters = { dUsername: dUsername, name: name, phone: phone };
			$.get('/patientvisithistory/searchPatientByNamePhone', parameters, function(data) {
				populateSearchResult(data);
			});
		}

	});

});