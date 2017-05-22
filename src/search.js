$(document).ready(function() {
    //Listening to key up event
    $("#searchfield").keyup(function () {
 
    //#searchfield input gets assigned to variable 'value'
    value = $(this).val();

    console.log("I'm starting the AJAX request now.")
	
	// //Date.now logic - FILL IN 
	// setTimeout(ajaxrequest, 3000);
	
	$.ajax({
		type: "POST",
		url: "/search",
		data: {"input": value},
		dataType: "text",
		success: function(response){	
				
		var responseobject = JSON.parse(response);
		var input = $("#searchfield");
	
		for (var i=0; i < responseobject.length; i++){
			console.log("This is the server's response to the AJAX request: "+responseobject[i]);
			var searchresult = responseobject[i].firstname+" "+responseobject[i].lastname
			$('#searchfield').append(searchresult);
		}
	
		}//closing success function
	});//closing ajax
	});//cosing searchfield keyup

});//cosing document ready



