// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();


	// This will bind a click eventhandler to the Checkout Button.  Everytime the Checkout button is clicked, this function will be executed.
	$('#checkoutButton').bind('click', function() {
		var medication = $('#medsField').val();
		var doctor = $('#docField').val();
	
		// Validation
		var validationError = false;

		if (medication == '') {
			$('#medsValidationError').show();
			validationError = true;
		}
		if (doctor == '') {
			$('#docValidationError').show();
			validationError = true;
		}
	
		}

		// Checkout!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

	});
});