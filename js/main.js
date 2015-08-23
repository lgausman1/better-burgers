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
		// error page
		.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

// controls for page rendering
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
	console.log("Page controller is working!");
});

