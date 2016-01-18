var app = angular.module('burgerApp', ['ngRoute']);
	
	// set up routes
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
			.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
			.when("/locations", {templateUrl: "partials/locations.html", controller: "PageCtrl"})
			.when("/menu", {templateUrl: "partials/menu.html", controller: "PageCtrl"})
			.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
	}]);
	
	// controls for page rendering ------ why have this???
	app.controller('PageCtrl', function (/* $scope, $location, $http */) {
		console.log("Page controller is working!");
	});
	
	app.controller('MenuItemsController', ['$http', function($http) { // dependency injection	
		var product = this;
		product.menu_items = [];
		$http.get('burgers.json')
			.success(function(data) {
				product.menu_items = data;
				console.log(product.menu_items);
			});

		}]);
	
    app.controller('MapController', ['$http', '$scope', function($http, $scope) {
		function loadmap() {
				var mapOptions = {
						center: new google.maps.LatLng(37.783333, -122.416667),
						zoom: 13,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
		  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions)
		  }
		  loadmap();	
		console.log("service working"); // 1
		var location = this;
		location.stores = [];
		$http.get('locations.js').
				success(function(data) {
						location.stores = data;
						var geocoder = new google.maps.Geocoder();
						
				$.each(location.stores, function(ind, obj) {
						//console.log(obj.address);
						function createMarker(mapPos) {
								var marker = new google.maps.Marker({
										position: mapPos,
										map: $scope.map
										}); // end marker
						
								// set up click event and info windows to display content
								google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
										return function() {
												$('#sidebar').empty();
												$('#sidebar').append(content).show();
												};
										})(marker, content, infowindow));		
								
						}	// end createMarker
						
						var infowindow = $('#sidebar');
						
						// pass in location's info for sidebar content
						var content = "<div'><h3>Better Burgers</h3>" 
								+ "<p><strong>" + obj.neighborhood + "</strong></p>"
								+ "<p>" + obj.address + "</p>" 
								+ "<p>" + obj.phone + "</p>"
								+ "<img src='" + obj.photo + "' >"
								+ "</div>";
						
						// geocode the address and set the marker
						geocoder.geocode({ 
								'address': obj.address
								},
								function(results, status) {
										if (status == google.maps.GeocoderStatus.OK) {
												// call marker and pass in values
												var myPos = results[0].geometry.location;
												//console.log(results[0].geometry.location.lng(), results[0].geometry.location.lat());
												createMarker(myPos);
												} else {
														console.log("ERROR " + status);
										}
										
								}); // end geocode
						
						}); // end each
				}); // end success

		}]); // end Map service
