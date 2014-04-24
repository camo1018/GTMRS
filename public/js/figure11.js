$(function() {

	var parameters = { username: serverData.username };
	$.get('/doctorthome/getMessageCount', parameters, function(data) {
		$('#messagesMessage').html('You have ' + data + ' unread messages.');
	});

});