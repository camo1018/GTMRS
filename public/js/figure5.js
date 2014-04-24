$(function() {

	var parameters = { username: serverData.username };
	$.get('/patienthome/getMessageCount', parameters, function(data) {
		$('#messagesMessage').html('You have ' + data + ' unread messages.');
	});

});