// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var username = serverData.username;
	var params = { username: username }
	$.get('/paymentinfo/checkExistingPaymentInfo', params, function(data) {
		if (data == 'exists') {
			document.window = 'patienthome';
		}
	});


	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#orderbutton').bind('click', function() {
		var cardholder = $('#name').val();
		var cardnumber = $('#cardNum').val();
		var cardtype = $('#cardType').val();
		var cvv = $('#cvvNum').val();
		var doe = $('#expireDate').val();

		// Validation
		var validationError = false;

		$('.validationError').hide();
		if (cardholder == '') {
			$('#cardholderValidationError').show();
			validationError = true;
		}
		if (cardnumber == '') {
			$('#cardNumValidationError').show();
			validationError = true;
		}
		if (cvv == '') {
			$('#cvvValidationError').show();
			validationError = true;
		}
		if (doe == '') {
			$('#dateValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		var parameters = { username: username, cName: cardholder, cNumber: cardnumber, cType: cardtype, cvv: cvv, doe: doe };

		$.get('/paymentinfo/order', parameters, function(data) {
		}));
	});


});