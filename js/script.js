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

myApp.controller('SignUpController', function($scope, $location, $firebaseAuth) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};

	$scope.signUp = function() {
		var email_sign = $("#signup-email").val();
		var password_sign = $("#signup-password").val();

		var auth = $firebaseAuth(myFirebaseRef);

		auth.$createUser({
			email: email_sign,
			password: password_sign
		}).then(function(authData) {
			$location.path('/chat');
		}).catch(function(error) {
			console.error("Error creating user! " + error);
			alert(error);
		});
	};
});

myApp.controller('LoginController', function($scope, $location, $firebaseAuth) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};

	$scope.login = function() {
		var email_login = $("#login-email").val();
		var password_login = $("#login-password").val();

		var auth = $firebaseAuth(myFirebaseRef);

		auth.$authWithPassword({
			"email": email_login,
			"password": password_login
		}).then(function(authData) {
			$location.path('/chat');
		}).catch(function(error) {
			console.error("Login failed! " + error);
			alert(error);
		});
	};
});

myApp.controller('ChatController', function($scope, $firebase, $location) {
	$scope.myStyle = {
		'backgroundColor': '#21A1CF'
	};

	var messagesRef = new Firebase("https://slack-imitation.firebaseio.com/public-messages");

    $scope.messages = $firebase(messagesRef).$asArray();

    $scope.addMessage = function() {
        $scope.messages.$add({
            from: $scope.user,
            body: $scope.msgPublic
        })
        $scope.msgPublic = "";
    };

    $scope.logout = function() {
    	myFirebaseRef.unauth();
    	$location.path('/');
    };
});