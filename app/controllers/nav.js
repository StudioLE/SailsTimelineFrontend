angular.module('navList', [])

.controller('navCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {
  $scope.navClass = function (href) {
    return href === '#' + $location.path() ? 'active' : '';
  };

  $scope.nav = [{
    url: '#/',
    title: 'Home'
  }, {
    url: '#/timeline',
    title: 'Timelines'
  }]

  $scope.isLoggedIn = function() {
    return User.get()
  }
  
}]);