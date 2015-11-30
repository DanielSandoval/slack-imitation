// Javasript Code.

var myApp = angular.module('app', ['ngRoute', 'firebase']);

var myFirebaseRef = new Firebase("https://slack-imitation.firebaseio.com/");

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
		var email_sign = $("#signup-email").val();
		var password_sign = $("#signup-password").val();

		myFirebaseRef.createUser({
			email: email_sign,
			password: password_sign
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
				$location.path('/chat');
				//$window.location.href = '/chat';
			}
		});
	};
});

myApp.controller('LoginController', function($scope, $location) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};

	$scope.login = function() {
		var email_login = $("#login-email").val();
		var password_login = $("#login-password").val();

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

myApp.controller("ChatController", ["$scope", "$firebase",
  function($scope, $firebase) {
    var messagesRef = new Firebase("https://slack-imitation.firebaseio.com/public-messages");

    $scope.messages = $firebase(messagesRef).$asArray();

    $scope.addMessage = function() {
        $scope.messages.$add({
            from: $scope.user,
            body: $scope.msgPublic
        })
    };
    $scope.msgPublic = "";
  }
]);