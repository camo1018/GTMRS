// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	var username = serverData.username;
	var visits;

	var parameters = { username: username }

	$.get('/visithistory/getVisits', parameters, function(data) {
		console.log(data.length);
		visits = data;
		for (var i = 0; i < visits.length; i++) {
			$('#visitDateTable').append('<tr><td><button type="button" style="width:150px" class="visitDateButton" id="'+i+'">' + 
				visits[i].visitDate.substring(0, 10) + '</button></td></tr>');
		}

		$('.visitDateButton').on('click', function() {
			var index = $(this).attr('id');
			var name;
			var param = { dUsername: visits[index].dUsername };
			$.get('/visithistory/getDoctorName', param, function(data) {
				name = data;
				$('#doctorname').val(name);
				$('#systolic').val(visits[index].systolic);
				$('#diastolic').val(visits[index].diastolic);
				$('#diagnoses').empty();
				for (var i = 0; i < visits[index].diagnoses.length; i++) {
					$('#diagnoses').append('<option>'+visits[index].diagnoses[i]+'</option>');
				}
				$('#prescriptionsTable').empty();
				$('#prescriptionsTable').append('<tr>' +
								        '<td style="width:150px">Medicine Name</td>' +
								        '<td style="width:100px">Dosage</td>' +
								        '<td style="width:80px">Duration</td>' +
								        '<td style="width:300px">Notes</td>' +
								      	'</tr>');	
				for (var i = 0; i < visits[index].prescriptions.length; i++) {
					$('#prescriptionsTable').append('<tr><td style="width:150px">' + visits[index].prescriptions[i].medicineName +
						'</td><td style="width:100px">' + visits[index].prescriptions[i].dosage + '</td><td style="width:80px">' + 
						visits[index].prescriptions[i].duration + '</td><td style="width:300px">' + visits[index].prescriptions[i].notes + '</td></tr>');
				}
			});
		})
	});

	

});