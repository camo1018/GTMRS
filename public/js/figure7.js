// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();
	$('.success, .fail').hide();

	var prescriptions = [];

	// This will bind a click eventhandler to the Checkout Button.  Everytime the Checkout button is clicked, this function will be executed.
	$('#addToBasket').on('click', function() {
		var medication = $('#medsField').val();
		var dosage = $('#dosageOption').val();
		var durationMonth = $('#durationMonthOption').val();
		var durationDay = $('#durationDayOption').val();
		var duration = parseInt(durationMonth)*30 + parseInt(durationDay);
		var doctor = $('#docField').val().split(' ');
		var pdate = $('#pdate').val();
	
		// Validation
		var validationError = false;

		$('.success, .fail').hide();
		$('.validationError').hide();
		if (medication == '') {
			$('#medsValidationError').show();
			validationError = true;
		}
		if (doctor == '') {
			$('#docValidationError').show();
			validationError = true;
		}
		if (pdate == '') {
			$('#pdateValidationError').show();
			validationError = true;
		}

		// Checkout!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		var username = serverData.username;

		var parameters = { username: username, medication: medication, dosage: dosage, duration: duration, 
			doctorFirstName: doctor[0], doctorLastName: doctor[1], pdate: pdate };

		$.get('/ordermedication/check', parameters, function(data) {
			if (data == 'good') {
				var prescription = parameters;
				prescriptions.push(prescription);
				$('.success').show();
			}
			else {
				$('#addFail').show();
			}
		});
	});

	$('#checkoutButton').on('click', function() {
		$('.success, .fail').hide();
		$('.validationError').hide();

		if (prescriptions.length == 0) {
			$('#checkoutFail').show();
			return;
		}

		var i;
		var count = prescriptions.length;
		for (i = 0; i < prescriptions.length; ++i) {
			$.get('/ordermedication/checkout', prescriptions[i], function(data) {
				--count;
				if (count == 0) {
					document.window = 'paymentinfo';
				}
			});
		}
		
	});
});