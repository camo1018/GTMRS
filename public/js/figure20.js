// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();


	var pname = $('#pnamefield').val();


	var params = { pname:pname};
	$.get('/billing/searchPatient', params, function(data) {
		for(var i =0; i<data.length; i++){
			var Name = data[i].Name;
			var Hphone = data[i].Hphone;	
			var username = data[i].Username;
			$('#possiblePatients').append('<tr><td id=' + username + ' align="center">' + Name+ '</td><td align="center">' + Hphone + '</td></tr>');
		}
	});

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#createButton').bind('click', function() {
		var pname = $('#pnamefield').val();

		// Validation
		var validationError = false;

		$('.validationError').hide();
		if (pname == '') {
			$('#pNameValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		var params = { pname:pname};
		$.get('/billing/searchPatient', params, function(data) {
		for(var i =0; i<data.length; i++){
			var Name = data[i].Name;
			var Hphone = data[i].Hphone;	
			var username = data[i].Username;
			$('#possiblePatients').append('<tr><td id=' + username + ' align="center">' + Name+ '</td><td align="center">' + Hphone + '</td></tr>');
		}
	});


	});

});