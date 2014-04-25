// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	function populateSearchResult(patients) {
		$('#patientResultsTable').empty();
		$('#patientResultsTable').append('<tr><td>Patient Name</td><td>Phone Number</td><td></td</tr>');
		for (var i = 0; i < patients.length; i++) {
			$('#patientResultsTable').append('<tr><td>' + patients[i].name + '</td><td>' + patients[i].phone + '</td>' +
				'<td id="td_' + i + '"><button type="button" id="' + i + '">View</button><button type="button" id="' + i + '">Record a Visit</button></td>');
			$('#patientResultsTable').find('#td_' + i).find('button')[0].on('click', function() {
				
			});
		}
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
			var parameters = { phone: phone }
			$.get('/patientvisithistory/searchPatientByPhone', parameters, function(data) {

			});
		}

	});

});