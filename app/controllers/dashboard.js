'use strict';

angular.module('timelyn.dashboard', ['ngRoute'])


/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

/*****************************************************************
*
* DashboardCtrl controlller
*
******************************************************************/
.controller('DashboardCtrl', ['$scope', '$http', '$location', 'Config', 'User', 'localStorageService', function($scope, $http, $location, Config, User, localStorageService) {
  
  $scope.user = function() {
    return User.get()
  }

  $scope.errors = []

  // $scope.check = function () {

  //   // Send a get request to test whether the JSON Web Token in local storage is valid
  //   $http.get(User.url('current'))
  //     .then(function(response) {
  //       console.log(User.get())
  //       if(response.status === 200) {
  //         console.log('JWT was accepted')
  //       }
  //       else {
  //         console.log('JWT was not accepted')
  //       }
  //     })
  // }

  // $scope.check()

}]);