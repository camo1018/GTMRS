// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

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
			$('#possiblePatients').replaceWith('<tr id =possiblePatients><td id=' + username + ' align="center">' + Name+ '</td><td align="center">' + Hphone + '</td></tr>');
		}

			var parameters = { pname:username};
			$.get('/billing/createTable', parameters, function(data) {
			for(var i =0; i<data.length; i++){
				var Pusername = data[i].Pusername;
				var vdate = data[i].vdate;
				var Vdate = vdate.substring(0,10);
				var vcost = data[i].vcost;
				var sname = data[i].sname;
				var scost = data[i].scost;
				var tcost = data[i].tcost;
				$('#visits').replaceWith('<tr id="visits"><td align="center">' + Vdate + '</td><td align="center">' + vcost + '</td>');
				$('#surgeries').replaceWith('<tr id="surgeries"><td align="center">' + sname + '</td><td align="center">' + scost + '</td>');
				$('#totalCost').replaceWith('<tr id="totalCost"><td>' + tcost + '</tr>');
			}
	});
	});


	});

});