// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	today = new Date();

	var mm = today.getMonth()+1;
    $("#month").val(mm);
    
    var yyyy = today.getFullYear();
    $("#year").val(yyyy);
    
    var month = $("#month").val();
    var year = $('#year').val();

    var Username = serverData.username;

	var params = { Username: Username, month:month, year:year};
	$.get('/patientreport/createTable', params, function(data) {
		for(var i =0; i<data.length; i++){
			var doc = data[i].doc;
			var NoPatients = data[i].NoPatients;	
			var NoPrescriptions = data[i].NoPrescriptions;
			var Billing = data[i].Billing;
			var vdate = date[i].Vdate;
			var visityear = vdate.substring(0,4);
			var visitmonth = vdate.substring(5,7);
			if(visityear==year && visitmonth==month){
				$('#visitReportTable').append('<tr><td align="center">' + doc + '</td><td align="center">' + NoPatients + 
				'</td><td align="center">' + NoPrescriptions + '</td><td align="center">' + Billing + '</td></tr>');
			}

		}
	});

});