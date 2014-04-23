// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var prescriptions = new Array();

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#submitButton').bind('click', function() {
		$('.validationError').hide();
		var dateOfVisit = $('#dovField').val();
		var name = $('#pnameField').val();
		var systolic = $('#sbpField').val();
		var diastolic = $('#dbpField').val();
		var diagnosis = $('#diagnosisField').val();
		var medname = $('#drugField').val();
		var height = $('#heightField').val();
		var income = $('#incomeOption').val();
		var month = $('#monthDuration').val();
		var day = $('#dayDuration').val();

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
		if (diagnosis == '') {
			$('#diagnosisValidationError').show();
			validationError = true;
		}
		if (medname == '') {
			$('#drugValidationError').show();
			validationError = true;
		}
		if (height == '') {
			$('#heightValidationError').show();
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



	});


});