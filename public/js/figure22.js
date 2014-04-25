// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {
var Username = serverData.username;


	var params = { Username: Username};
	$.get('/surgeryreport/createTable', params, function(data) {
		for(var i =0; i<data.length; i++){
			var type = data[i].Stype;
			var CPT = data[i].CPT;	
			var NoProcedures = data[i].NoProcedures;
			var NoDoctors = data[i].NoDoctors;
			var Billing = data[i].Billing;
			$('#surgeryReportTable').append('<tr><td align="center">' + type + '</td><td align="center">' + CPT + 
			'</td><td align="center">' + NoProcedures + '</td><td align="center">' + NoDoctors + 
			'</td><td align="center">' + Billing + '</td></tr>');
		}
	});
});