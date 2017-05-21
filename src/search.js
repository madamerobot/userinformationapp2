var searchresult = [];

$(document).ready(function() {
    //Listening to key up event
    $("#searchfield").keyup(function () {
    //By assigning 'this' to variable 'that', all code below
    //will refer to the searchfield object, even when written
    //within a nested function and thus having a different scope
    var that = this,
    //#searchfield input gets assigned to variable 'value'
    value = $(this).val();
    console.log("I'm starting the AJAX request now.")

	$.ajax({
		type: "POST",
		url: "/search",
		data: {"input": value},
		dataType: "text",
		success: function(response){	
			
			//This is what the response looks like.
			//It is an object with three properties:
			//[{"First name: ":"Valerie",
			//"Last name: ":"Fuchs",
			//"Email: ":"hi@hi.com"}]
			
			console.log("This is the server's response to the AJAX request: "+response);
			$('#results').text(response);

			var setTimer = function() {
				
			var ajaxrequesttime = Date.now();
			console.log("I'm done with the AJAX request at: "+ajaxrequesttime);

			for (var i=ajaxrequesttime; i < (ajaxrequesttime+3000); i++) {
			console.log("I'm chilling for 3000ms");
			}
	}//closing setTimer

	setTimer();
		
		}//closing success function
	 });//closing ajax
	
	

	});//cosing searchfield keyup
});//cosing document ready
