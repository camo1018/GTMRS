// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();


	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#loginbutton').bind('click', function() {
		var username = $('#user').val();
		var password = $('#pass').val();

		// Validation
		var validationError = false;

		if (username == '') {
			$('#usernameValidationError').show();
			validationError = true;
		}
		if (password == '') {
			$('#passwordValidationError').show();
			validationError = true;
		}

	

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;



	});


});