// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var availability = new Array();

	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#submitButton').bind('click', function() {
        $('.validationError').hide();
        var license = $('#licenseField').val();
		var fName = $('#fnameField').val();
        var lName = $('#lnameField').val();
		var birthday = $('#dobField').val();
        var wPhone = $('#wPhoneField').val();
		var specialty = $('#specialtyOption').val();
        var roomNo = $('#roomField').val();
        var address = $('#addressField').val();
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

		var username = serverData.username;

		var parameters = { username: username, licenseNum: license, fname: fName, lname: lName, dob: birthday, 
			wPhone: wPhone, spec: specialty, roomNum:roomNo, address: address, 
			availability: availability };

		$.get('/doctorProfile/submitDocProfile', parameters, function(data) {
			document.location = "doctorhome";
		});

	});

	// Everytime we click the Add button under, we will append html text into the document so that we will have a new row that describes an availability.
	$('#availabilityAddButton').bind('click', function() {
		var availableday = $('#availabilityOption').val();
		var availabletotime = $('#toOption').val();
		var availablefromtime = $('#fromOption').val();
		var available = (availableday+":"+availablefromtime+"-"+availabletotime);
		$('#availabilityDuplicateError').hide();

		// If there is already an allergy of the same name, then don't add it.
		if (availability.indexOf(available) != -1) {
			$('#availabilityDuplicateError').show();
			return;
		}

		$('#availabilityList').append('<tr class="availabilityListRow">' +
            '<td id="availabilityElement" class="availabilityListElementOffset">' + available + '</td>' +
            '<td><button id="remove' + available + '" type="button">-</button></td>' +
          '</tr>');

		$('#remove'+ available).bind('click', function() {
			var availabilityElementName = $(this).parent().find('#availabilityElement').val();
			availability.splice(availability.indexOf(availabilityElementName),1);
			$(this).parent().parent().remove();
		});

		availability.push(available);
	});
});	
