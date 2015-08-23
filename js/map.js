// google maps code goes here

function initialize() {
	//geocoder = new google.maps.Geocoder();
	var mapCanvas =  document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(37.783333, -122.416667),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; // end mapOptions

	var map = new google.maps.Map(mapCanvas, mapOptions);

}	