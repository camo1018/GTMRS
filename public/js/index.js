// Wait for DOM ready
$(function() {
	$("#fadeTag, #fadeLogo").animate({
		opacity: 1
	}, 1000, function() {
		// Animation complete
	});

	setTimeout(function() {
		$("#fadeTag, #fadeLogo").animate({
			opacity: 0
		}, 1000, function() {
			document.location = "welcome";
		});
	}, 5000);
});