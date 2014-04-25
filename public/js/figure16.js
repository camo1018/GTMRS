//NEEDS TO BE LOOKED AT.... validation error is not working properly


// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var pUsername = '';
	var dUsername = serverData.username;
	var dName = '';
	var params = { dUsername: dUsername };
	$.get('/surgeryrecord/getDoctorName', params, function(data) {
		dName = data;
	});

	var surgeries = []
	$.get('/surgeryrecord/getSurgeries', function(data) {
		surgeries = data;
		for (var i = 0; i < surgeries.length; i++) {
			$('#procedureOption').append('<option value="' = i + '">' + surgeries[i].surgeryType + '</option>');
		}
		$('#procedureOption').on('change', function() {
			$('#CPTCode').val(surgeries[$(this).val()].cptCode);
			var cptParam = { cptCode: surgeries[$(this).val()].cptCode };
			$.get('/surgeryrecord/getPreops', cptParam, function(data) {
				var preopStr = '';
				if (data.length > 0) {
					preopStr += data[0].medName;
					for (var i = 1; i < data.length; i++) {
						preopStr += '\n' + data[i].medName;
					}
					$('#preopMed').val(preopStr);
				}
			});
		});
	});

	var patients = [];


	// This will bind a click eventhandler to the Submit Button.  Everytime the Submit button is clicked, this function will be executed.
	$('#searchButton').bind('click', function() {
		var pname = $('#pNameField').val();


		// Validation
		var validationError = false;

		if (pname == '') {
			$('#pnameValidationError').show();
			validationError = true;
		}

		// Submit!

		// If validation failed, then don't actually submit anything.
		if (validationError)
			return;

		var parameters = { name: pname };
		$.get('/surgeryrecord/searchPatient', parameters, function(data) {
			patients = data;
			$('#searchTable').empty();
			$('#searchTable').append('<tr><td>Patient Name</td><td>Phone Number</td></tr>');
			for (var i = 0; i < patients.length; i++) {
				var patient = patients[i];
				$('#searchTable').append('<tr id="tr_' + i + '"><td id="' + i + '">' + patient.name + '</td><td id="' + i + '">' + patient.phone +'</td></tr>');
				$('#tr_'+ i).find('td').on('click', function() {
					pUsername = patients[$(this).attr('id')].username);
					$('#patientName').val(patients[$(this).attr('id')].name);
					$('#surgeonName').val(dName);
				});
			}
		});

	});

	$('#recordButton').on('click', function() {
		var patientName = $('#patientName').val();
		var surgeonName = $('#surgeonName').val();
		var surgery = surgeries[$('#procedureOption').val()];
		var numAssistants = $('#numAssistantsOption').val();
		var anesthesiaStartTime = $('#anesthesiaStartTimeOption').val();
		var surgeryStartTime = $('#surgeryStartTimeOption').val();
		var surgeryCompletionTime = $('#surgeryCompletionTimeOption').val();
		var complications = $('#complications').val();

		var parameters = { pUsername: pUsername, dUsername: dUsername, surgery: surgery, numAssistants: numAssistants, 
			anesthesiaStartTime: anesthesiaStartTime, surgeryStartTime: surgeryStartTime, 
			surgeryCompletionTime: surgeryCompletionTime, complications: complications };
		$.get('/surgeryrecord/recordSurgery', parameters, function(data) {
			
		});

	});
});