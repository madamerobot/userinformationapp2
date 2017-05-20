$(document).ready(function() {
    //Listening to key up event
    $("#searchfield").keyup(function () {
    //By assigning 'this' to variable 'that', all code below
    //will refer to the searchfield object, even when written
    //within a nested function and thus having a different scope
    var that = this,
    //#searchfield input gets assigned to variable 'value'
    value = $(this).val();
	
	$.ajax({
		type: "POST",
		url: "/search",
		data: {"input": value},
		dataType: "text",
		success: function(response){	
		console.log("This is the server's response to the AJAX request: "+response);
		$('#results').text(response);
		//Receiving the result of search here
		}
	    });//closing ajax
	});//cosing searchfield keyup
});//cosing document ready
