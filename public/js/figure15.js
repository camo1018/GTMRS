// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();
	$('.success').hide();

	var prescriptions = [];
	var diagnoses = [];
	var patients = [];

	var parameters = { username: serverData.username }
	$.get('recordvisit/getPatients', parameters, function(data) {
		patients = data;
		for (var i = 0; i < patients.length; i++) {
			$('#pnameField').append('<option value="' + patients[i].username + '">' + patients[i].name + '</option>');
		}
	})

	$('#addprescriptionbutton').on('click', function() {
		$('.validationError').hide();
		$('.success').hide();
		var medname = $('#drugField').val();
		var dosage = $('#dosage').val();
		var month = $('#monthDuration').val();
		var day = $('#dayDuration').val();
		var notes = $('#notes').val();

		var prescription = { medname: medname, dosage: dosage, duration: parseInt(month)*30 + parseInt(day), notes: notes };
		prescriptions.push(prescription);
		$('#addSuccess').show();
	});

	$('#addDiagnosisButton').on('click', function(0 {
		$('.success').hide();
		$('.validationError').hide();

		var diagnosis = $('#diagnosisField').val();
		diagnoses.push(diagnosis);
	}))

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#submitButton').bind('click', function() {
		$('.validationError').hide();
		$('.success').hide();
		var dateOfVisit = $('#dovField').val();
		var pUsername = $('#pnameField').val();
		var systolic = $('#sbpField').val();
		var diastolic = $('#dbpField').val();		

		// Validation
		var validationError = false;

		if (dateOfVisit == '') {
			$('#dovValidationError').show();
			validationError = true;
		}
		if (name == '') {
			$('#nameValidationError').show();
			validationError = true;
		}
		if (systolic == '') {
			$('#sbpValidationError').show();
			validationError = true;
		}
		if (diastolic == '') {
			$('#dbpValidationError').show();
			validationError = true;
		}
		if (month == "0" && day == "0"){
			$('#durationValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		var parameters = { dateOfVisit: dateOfVisit, dUsername: username, pUsername: pUsername, systolic: systolic, diastolic: diastolic, diagnoses: diagnoses, prescriptions: prescriptions };
		$.get('/recordvisit/record', parameters, function(data) {

		});







	});


});