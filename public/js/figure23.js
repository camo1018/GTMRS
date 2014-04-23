// Wait for DOM ready
// Put all code inside this function.  This function is a JQuery function that will make sure the page is loaded fully first before executing any code.
$(function() {

	today = new Date();

	var mm = today.getMonth()+1;
    $("#month").val(mm);
    
    var yyyy = today.getFullYear();
    $("#year").val(yyyy);
    

});