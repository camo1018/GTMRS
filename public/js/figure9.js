// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	var username = serverData.username;
	var visits;

	$.get('/visithistory/getVisits', function(data) {
		visits = data;
		for (var i = 0; i < visits.length; i++) {
			$('#visitDateTable').append('<tr><td><button type="button" style="width:100px" id="'+i+'">' + visits[i].visitDate + '</button></td></tr>');
		}
	});

	

});