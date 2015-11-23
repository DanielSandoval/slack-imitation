// Javasript Code.

Parse.initialize("Usqx2kaFP1RPRWR4ZC7k1rLzoO8Uk8LuJdsw3tND", "CzcfQ46fNmqiyQliFRx91D0ndkBw1ceNUrHhGiv8");

var myApp = angular.module('app', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl:'templates/login.html',
			controller: 'LoginController',
			controllerAs: 'LoginCtrl'
		})
		.when('/signup', {
			templateUrl: 'templates/signup.html',
			controller: 'SignUpController',
			controllerAs: 'SignUpCtrl'
		})
		.when('/chat', {
			templateUrl:'templates/chat.html',
			controller: 'ChatController',
			controllerAs: 'ChatCtrl'
		})
	    .otherwise({
	    	redirectTo: '/'
	    });
});

myApp.controller('SignUpController', function($scope, $location) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};

	$("#signup-email").keyup(function() {
		var email = $(this).val();
		$("#signup-user").val(email);
	});

	$scope.signUp = function() {
		var username_sign = $("#signup-user").val();
		var email_sign = $("#signup-email").val();
		var password_sign = $("#signup-password").val();

		var user = new Parse.User();
		user.set("username", username_sign);
		user.set("password", password_sign);
		user.set("email", email_sign);

		user.signUp(null, {
			success: function(user) {
				alert("Sign Up successfully");
				$location.path("#/");
			},
			error: function(user, error) {
				alert("Error: " + error.message);
			}
		})
	};

	$scope.login = function() {
		var username_login = $("").val();
	}
});

myApp.controller('LoginController', function($scope) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};
});

myApp.controller('ChatController', function($scope) {
	$scope.message = "hola mundo";
});

/*$(document).ready(function() {
	//
});*/