// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var dateCounts;
	$.get('/monthlyappointmentscalendar/getAppointments', { dUsername: serverData.username }, function(data) {
		dataCounts = data;
		var eventsArray = [];
		for (var i = 0; i < dataCounts.length; i++) {
			var eventObj = { title: dataCounts[i].count, start: new Date(dataCounts[i].date.substring(0, 4), dataCounts[i].date.substring(5, 7),
				dataCounts[i].date.substring(8, 10)) };
			eventsArray.push(eventObj);
		}
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: ''
			},
			editable: true,
			events: eventsArray
		});
	});   

});