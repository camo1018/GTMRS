// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#registerButton').bind('click', function() {
		$('.validationError').hide();

		var username = $('#username').val();
		var password = $('#password').val();
		var userType = $('#userType').val();
		var confirm = $('#confirmPass').val();

		// Validation
		var validationError = false;

		if (username == '') {
			$('#nameValidationError').show();
			validationError = true;
		}
		if (password == '') {
			$('#passValidationError').show();
			validationError = true;
		}
		if (confirm == '') {
			$('#confirmValidationError').show();
			validationError = true;
		}
		else if (confirm != password) {
			$('#confirmMatchError').show();	
			validationError = true;
		}

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;
		// Submit!

		var parameters = { username: username, password: password, userType: userType};

		$.get('/register/newuser', parameters, function(data) {
			if (data == 'patient')
				document.location = 'patientprofile';
			else if (data == 'doctor')
				document.location = 'doctorprofile';
			else if (data == 'admin')
				document.location = 'adminhome';
			else
				document.location = 'register';

		});

	});
});