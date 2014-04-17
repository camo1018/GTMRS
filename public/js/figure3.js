// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var allergies = new Array();

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#submitButton').bind('click', function() {
		var name = $('#nameField').val();
		var dateOfBirth = $('#dobField').val();
		var gender = $('#genderOption').val();
		var address = $('#addressField').val();
		var homePhone = $('#homePhoneField').val();
		var workPhone = $('#workPhoneField').val();
		var weight = $('#weightField').val();
		var height = $('#heightField').val();
		var income = $('#incomeOption').val();

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
		if (weight == '') {
			$('#weightValidationError').show();
			validationError = true;
		}
		if (height == '') {
			$('#heightValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;



	});

	// Everytime we click the Add button under Allergies, we will append html text into the document so that we will have a new row that describes an allergy.
	$('#addAllergyButton').bind('click', function() {
		var allergyName = $('#allergyField').val();

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