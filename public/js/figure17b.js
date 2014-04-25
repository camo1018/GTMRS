// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {
	var dUsername = serverData.username;
	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var params = { dUsername: dUsername};
	$.get('/sendmessagetopatient/getDoctors', params, function(data) {
		for(var i =0; i<data.length; i++){
			var fName = data[i].fName;
			var lName = data[i].lName;
			var username = data[i].username;
			$('#dNameOption').append('<option value=' + username + '>Dr. ' + fName + ' ' + lName + '</option>');
		}
	});

	$.get('/sendmessagetopatient/getPatients', params, function(data) {
		for(var i =0; i<data.length; i++){
			var Name = data[i].Name;
			var username = data[i].username;
			var hphone = data[i].Hphone;
			$('#pNameOption').append('<option value=' + username + '>' + Name + ' (' + hphone +')</option>');
		}
	});
	
	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#sendMessageButton').bind('click', function() {
		var dmessage = $('#dmessageField').val();
        var pmessage = $('#pmessageField').val();
		

		// Validation
		var validationError = false;

		$('.validationError').hide();
		if ((dmessage == '') && (pmessage == '')) {
			$('#messageValidationError').show();
			validationError = true;
		}
		
	
		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		var receivingDUsername = $('#dNameOption').val();
		var pUsername = $('#pNameOption').val();
		var parameters1;
		var parameters2;

		if(pmessage!='' && dmessage==''){
			parameters1 = { dUsername: dUsername, pUsername: pUsername, message: pmessage };
			$.get('/sendmessagetopatient/sendToPatient', parameters1, function(data) { 
				document.location = 'doctorhome';
			})

		}else if(dmessage!='' && pmessage==''){
			parameters1 = { dUsername: dUsername, receivingDUsername: receivingDUsername, message: dmessage };
			$.get('/sendmessagetopatient/communicateDoctor', parameters1, function(data) { 
				document.location = 'doctorhome';
			})

		}else if(dmessage!='' && pmessage!=''){ //both fields have messages
			parameters1 = { dUsername: dUsername, pUsername: pUsername, message: pmessage };
			parameters2 = { dUsername: dUsername, receivingDUsername: receivingDUsername, message: dmessage };
			$.get('/sendmessagetopatient/sendToPatient', parameters1, function(data1) { 
				$.get('/sendmessagetopatient/communicateDoctor', parameters2, function(data2) { 
				});
				document.location = 'doctorhome';
			});
		}

});

});