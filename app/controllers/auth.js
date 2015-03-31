'use strict';

angular.module('timelyn.auth', ['ngRoute', 'LocalStorageModule'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/auth/login.html',
    controller: 'LoginCtrl'
  });
  $routeProvider.when('/register', {
    templateUrl: 'views/auth/register.html',
    controller: 'RegisterCtrl'
  });
}])

/*****************************************************************
*
* LoginCtrl controlller
*
******************************************************************/
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Config', 'User', 'localStorageService', function($scope, $http, $location, Config, User, localStorageService) {

  $scope.errors = []

  $scope.login = function () {
    // Send a POST request to the authController
    $http.post(User.url('login'), $scope.user)
      .then(function(response) {
        // If successful then
        if(response.status === 200) {
          // Store the JSON Web Token in local storage
          localStorageService.set('jwt', response.data.token)
          User.set(true)
          $location.path('/dashboard')
        }
        // If errors
        else {
          $scope.errors.push('Invalid credentials')
        }
      })
  }

}])


/*****************************************************************
*
* RegisterCtrl controller
*
******************************************************************/
.controller('RegisterCtrl', ['$scope', '$http', '$location', 'Config', function($scope, $http, $location, Config) {

  $scope.errors = []

  $scope.register = function () {
    // Send a POST request to the authController
    $http.post(User.url('register'), $scope.user)
      // If success then...
      .success(function(data, status, headers, config) {
        if(status === 200 && data.user) {
          $location.path('/dashboard')
        }
        else {
          $scope.errors.push('Register appeared to succeed but something else has gone wrong')
        }
      })
      // If error then...
      .error(function(data, status, headers, config) {
        if(status === 401) {
          $scope.errors.push('Invalid credentials')
        }
        else {
          $scope.errors.push('Register failed for unknown reason')
        }
      });
  }

}]);