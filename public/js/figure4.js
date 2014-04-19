// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	// var allergies = new Array();

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#submitButton').bind('click', function() {
        var license = $('#licenseField').val();
		var fName = $('#fnameField').val();
        var lName = $('#lnameField').val();
		var birthday = $('#dobField').val();
        var wphone = $('#wPhoneField').val();
		var specialty = $('#specialtyOption').val();
        var roomNo = $('#roomField').val();
		var availability = $('#availabilityOption').val();
        var from = $('#fromOption').val();
        var to = $('#toOption').val();

		// Validation
		var validationError = false;
		if (license == '') {
			$('#licenseValidationError').show();
			validationError = true;
		}
		if (fName == '') {
			$('#fnameValidationError').show();
			validationError = true;
		}
		if (lName == '') {
			$('#lnameValidationError').show();
			validationError = true;
		}
		if (birthday == '') {
			$('#dobValidationError').show();
			validationError = true;
		}
		if (wPhone == '') {
			$('#wPhoneValidationError').show();
			validationError = true;
		}
		if (roomNo == '') {
			$('#roomValidationError').show();
			validationError = true;
		}
		if (address == '') {
			$('#addressValidationError').show();
			validationError = true;
		}
		

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;



	});

	// Everytime we click the Add button under Allergies, we will append html text into the document so that we will have a new row that describes an allergy.
	$('#availabilityAddButton').bind('click', function() {
		var availailityTime = $('#allergyField').val();

		// If there is already an allergy of the same name, then don't add it.
		if (allergies.indexOf(allergyName) != -1)
			return;

		$('#allergyList').append('<tr class="allergyListRow">' +
            '<td id="allergyElement" class="allergyListElementOffset">' + allergyName + '</td>' +
            '<td><button id="remove' + allergyName + '" type="button">-</button></td>' +
          '</tr>');

		$('#remove'+allergyName).bind('click', function() {
			var allergyElementName = $(this).parent().find('#allergyElement').val();
			allergies.splice(allergies.indexOf(allergyElementName),1);
			$(this).parent().remove();
		})

		allergies.push($('allergyField').val())
	});

});