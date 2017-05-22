$(document).ready(function() {
    //Listening to key up event
    $("#searchfield").keyup(function () {
 
    //#searchfield input gets assigned to variable 'value'
    value = $(this).val();

    console.log("I'm starting the AJAX request now.")
	
	//Break of 3000 ms to limit number of AJAX requests
	var now = Date.now();
	var buffer = now + 3000;
	
	$.ajax({
		type: "POST",
		url: "/search",
		data: {"input": value},
		dataType: "text",
		success: function(response){	
				
		var responseobject = JSON.parse(response);
	
		for (var i=0; i < responseobject.length; i++){
			console.log("This is the server's response to the AJAX request: "+responseobject[i].firstname);
			var searchresult = responseobject[i].firstname+" "+responseobject[i].lastname+" "+responseobject[i].email
			// $('#searchresult').value(searchresult);
		}
	
		}//closing success function
	});//closing ajax
	});//cosing searchfield keyup
});//cosing document ready



