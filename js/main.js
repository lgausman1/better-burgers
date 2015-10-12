(function() {
	// this is where our app logic goes
	
	// set up the app
	var app = angular.module('burgerApp', ['ngRoute']);
	
	// set up routes
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			// index
			.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
			// about
			.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
			//locations
			.when("/locations", {templateUrl: "partials/locations.html", controller: "PageCtrl"})
			//menu
			.when("/menu", {templateUrl: "partials/menu.html", controller: "PageCtrl"})
			// error page
			.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
	}]);
	
	// controls for page rendering
	app.controller('PageCtrl', function (/* $scope, $location, $http */) {
		console.log("Page controller is working!");
	});
	
	app.controller('MenuItemsController', ['$http', function($http) { // dependency injection
	//app.controller('MenuItemsController', function() {	
		var product = this;
		//this.product = menu_items;

		product.menu_items = [];
		$http.get('/burgers.json').success(function(data) {
				product.menu_items = data;
				console.log(product.menu_items);
			});
		//return menu_items;
		 // returns Hawaiian Burger
		}]);
	
	//var menu_items = [
	//	{
	//	"productTitle": "NOPA Bacon Cheeseburger",
	//	"productPrice": "11.00",
	//	"productDescr": "Pork loin alcatra pastrami salami spare ribs sirloin pork short ribs flank brisket ground round.",
	//	"photo": "images/burger4-222x148.jpg"
	//	},
	//	{
	//		productTitle: "Hawaiian Burger",
	//		productPrice: "11.00",
	//		productDescr: "Pork loin alcatra pastrami salami spare ribs sirloin pork short ribs flank brisket ground round.",
	//		photo: "images/burger4-222x148.jpg"
	//	}
	//];
	
})();