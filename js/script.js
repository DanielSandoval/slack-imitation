// Javasript Code.

//Parse.initialize("Usqx2kaFP1RPRWR4ZC7k1rLzoO8Uk8LuJdsw3tND", "CzcfQ46fNmqiyQliFRx91D0ndkBw1ceNUrHhGiv8");

var myApp = angular.module('app', ['ngRoute']);

//var myFirebaseRef = new Firebase("https://slack-imitation.firebaseio.com/");

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
			templateUrl:'templates/chat.html'
			/*controller: 'ChatController',
			controllerAs: 'ChatCtrl'*/
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

	//var myFirebaseRef = new Firebase("https://slack-imitation.firebaseio.com/");

	$scope.signUp = function() {
		var email_sign = $("#signup-email").val();
		var password_sign = $("#signup-password").val();

		//var myFirebaseRef = new Firebase("https://slack-imitation.firebaseio.com/");

		myFirebaseRef.createUser({
			email: email_sign,
			password: password_sign
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
				$location.path('#/chat');
				//$window.location.href = '/chat';
			}
		});
	};

	/*$scope.signUp = function() {
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
	};*/
});

myApp.controller('LoginController', function($scope, $location) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};

	//$location.path('/chat');

	var myFirebaseRef = new Firebase("https://slack-imitation.firebaseio.com/");

	$scope.login = function() {
		var email_login = $("#login-email").val();
		var password_login = $("#login-password").val();

		//var myFirebaseRef = new Firebase("https://slack-imitation.firebaseio.com/");

		myFirebaseRef.authWithPassword({
			"email": email_login,
			"password": password_login
		}, function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else{
				console.log("Authenticated successfully with payload:", authData);
				//$location.path("#/chat");
				$location.path('/chat');
			}
		});
	};
});

/*myApp.controller('ChatController', function($scope) {
	$scope.message = "hola mundo";
});*/

/*$(document).ready(function() {
	//
});*/