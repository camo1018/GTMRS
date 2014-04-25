// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {
	var Username = serverData.username;


	var params = { Username: Username};
	$.get('/docreport/createTable', params, function(data) {
		for(var i =0; i<data.length; i++){
			var specialty = data[i].specialty;
			var avgRating = data[i].avgRating;
			var NoSurgeries = data[i].NoSurgeries;
			$('#docReportTable').append('<tr><td align="center">' + specialty + '</td><td align="center">' + avgRating + 
			'</td><td align="center">' + NoSurgeries + '</td></tr>');
		}
	});

	

});