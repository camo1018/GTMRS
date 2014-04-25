// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	today = new Date();
    
	var dd = today.getDate() + 1;
    $("#day").val(dd-1);
    
	var mm = today.getMonth()+1;
    $("#month").val(mm);
    
    var yyyy = today.getFullYear();
    $("#year").val(yyyy);

    var fullDate = ''+yyyy+'-'+mm+'-'+dd;
    var dUsername = serverData.username;

    function updateSchedule(date) {
	    var parameters = { dUsername: dUsername, date: date }
	    $.get('/dailyappointmentscalendar/getAppointments', parameters, function(data) {
	    	var patients = data;
	    	$('#appointmentsTable').empty();
	    	$('#appointmentsTable').append('<tr><td>Patient Name</td><td>Scheduled Time</td></tr>');
	    	for (var i = 0; i < patients.length; i++) {
	    		(function (i) {
			    	$.get('/dailyappointmentscalendar/getTimeRange', { dUsername: dUsername, time: patients[i].time }, function(data) {
			    		$('#appointmentsTable').append('<tr><td>' + patients[i].name + '</td><td>' + data.from + ' - ' + data.to + '</td></tr>');
			    	});
			    })(i);
	    	}
	    }); 
	}

	updateSchedule(fullDate);

	$("#day, #month, #year").on('change', function() {
		var newDate = '' + $('#year').val() + '-' + $('#month').val() + '-' + (parseInt($('#day').val()) + 1);
		updateSchedule(newDate);
	});
});
