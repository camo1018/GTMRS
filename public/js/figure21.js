// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();


	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#submitButton').bind('click', function() {
		var name = $('#nameField').val();
		var dateOfBirth = $('#dobField').val();
		var gender = $('#genderOption').val();
		var address = $('#addressField').val();
		var homePhone = $('#homePhoneField').val();
		var workPhone = $('#workPhoneField').val();
		var emergencyName = $('#emergencyNameField').val();
		var emergencyPhone = $('#emergencyPhoneField').val();
		var weight = $('#weightField').val();
		var height = $('#heightField').val();
		var income = $('#incomeOption').val();
		var ename = $('#EcontactName').val();
		var ephone = $('#EcontactPhone').val()

		// Validation
		var validationError = false;

		if (name == '') {
			$('#nameValidationError').show();
			validationError = true;
		}
		if (dateOfBirth == '') {
			$('#dobValidationError').show();
			validationError = true;
		}
		if (address == '') {
			$('#addressValidationError').show();
			validationError = true;
		}
		if (homePhone == '') {
			$('#homePhoneValidationError').show();
			validationError = true;
		}
		if (workPhone == '') {
			$('#workPhoneValidationError').show();
			validationError = true;
		}
		if (emergencyName == '') {
			$('#emergencyNameValidationError').show();
			validationError = true;
		}
		if (emergencyPhone == '') {
			$('#emergencyPhoneValidationError').show();
			validationError = true;
		}
		if (weight == '') {
			$('#weightValidationError').show();
			validationError = true;
		}
		if (height == '') {
			$('#heightValidationError').show();
			validationError = true;
		}
		if (ename == '') {
			$('#econtactValidationError').show();
			validationError = true;
		}
		if (ephone == '') {
			$('#ephoneValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;


	});

});