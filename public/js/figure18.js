// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {
	var username = serverData.username;
	// Originally, the HTMLs are set to show
	// Originally, the HTMLs are set to show, so let's hide that all.
	// .validationError is a JQuery selector word that will find all HTML elements on the page whose CSS class is 'validationError'
	$('.validationError').hide();

	var type;
	var parameters = {username:username}
	$.get('/inbox/getUserType', parameters, function(data) {
		type = data;
		if(type=='patient'){
			$.get('/inbox/getMessagesPatient', parameters, function(data) {
				for(var i =0; i<data.length; i++){
					var Status = data[i].Status;
					var DateTime = data[i].DateTime;
					var date = DateTime.substring(0,10);
					var DfName = data[i].DfName;
					var DlName = data[i].DlName;
					var Message = data[i].Message;
					$('#messageTable').append('<tr><td align="center">' + Status + '</td><td align="center">'+ date + 
					'</td><td align="center"> Dr. ' + DfName + ' ' + DlName + '</td><td align="center">' + Message + '</td></tr>');
				}
			});
		}
		else if(type=='doctor'){
			$.get('/inbox/getMessagesDoctor', parameters, function(data) {
				for(var i =0; i<data.length; i++){
					var Status = data[i].Status;
					var DateTime = data[i].DateTime;
					var date = DateTime.substring(0,10);
					var PName = data[i].PName;
					var Message = data[i].Message;
					$('#messageTable').append('<tr><td align="center">' + Status + '</td><td align="center">'+ date + 
					'</td><td align="center"> Dr. ' + PName + '</td><td align="center">' + Message + '</td></tr>');
				}
			});
		}
	});
});