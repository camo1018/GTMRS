$(function() {
	var parameters = { username: serverData.username };
	$.get('/doctorhome/getMessageCount', parameters, function(data) {
		$('#messagesMessage').html('You have ' + data + ' unread messages.');
	});
});