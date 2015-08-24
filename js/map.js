// google maps code goes here

function initialize() {
	var geocoder = new google.maps.Geocoder();
	var mapCanvas =  document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(37.783333, -122.416667),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; // end mapOptions

	var map = new google.maps.Map(mapCanvas, mapOptions);

	// locations for map markers and sidebar content
	var locations = [
		{
			"neighborhood": "NOPA",
			"address": "1100 Divisadero St, San Francisco, CA",
			"phone": "415-555-1234"
		},
		{
			"neighborhood": "Pacific Heights",
			"address": "2305 Fillmore St, San Francisco, CA",
			"phone": "415-757-9876"
		},
		{
			"neighborhood": "SOMA",
			"address": "312 Howard St, San Francisco, CA",
			"phone": "415-333-5151"
		},
		{
			"neighborhood": "Richmond",
			"address": "3840 Geary Blvd, San Francisco, CA",
			"phone": "415-777-9311"
		},
		{
			"neighborhood": "Mission District",
			"address": "1173 Valencia St, San Francisco, CA",
			"phone": "415-678-0987"
		}
	];

      // loop through locations and grab neighborhood, address and phone
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

		var infowindow = $('#sidebar').hide();

		// pass in the location's info for sidebar content 
		var content = "<div class='well'><h3>Better Burgers</h3>" 
							+ "<p><strong>" + obj.neighborhood + "</strong></p>"
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

}	// end initialize