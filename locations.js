[
	{
		"neighborhood": "NOPA",
		"address": "1100 Divisadero St, San Francisco, CA"
		"phone": "415-555-1234"
	}
]



      // loop through posts and grab neighborhood, location and phone
  		$.each(locations,function (ind, obj) {
  			 
  			function create_marker (MapPos) {
  				var marker = new google.maps.Marker({
  					position: MapPos,
        			map: map
  				});

	  			// set up click event and info windows to display content
	  			google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
	  				return function () {
	  					$('#sidebar').empty();
	  					$('#sidebar').append(content).show();

	  				} 
	  			})
	  			(marker, content, infowindow)); // end listener 

  			} // end create_marker

  			//var infowindow = new google.maps.InfoWindow();
  			var infowindow = $('#sidebar').hide();

        // pass in the location's address 
  			var content = "<div class='well'><h3>Better Burgers</h3>" 
  								+ "<p>" + obj.neighborhood + "</p>"
  								+ "<p>" + obj.address + "</p>" 
  								+ "<p>" + obj.phone + "</p>"
  								+ "</div>";

  			// geocode the address and set the marker 			
  			geocoder.geocode({
  				'address': obj.address
  			}, function (results) {
  				//call marker and pass in values
  				var myPos = results[0].geometry.location;
  				create_marker(myPos);
  				
  				} // end function

  			); // end geocode

  		}); // end each