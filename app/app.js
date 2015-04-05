'use strict';

/*****************************************************************
*
* Declare app level module which depends on views, and components
*
******************************************************************/
angular.module('timelyn', [
  'ngRoute',
  'LocalStorageModule',
  'navList',
  'angularFileUpload',
  'alertModule',
  'timelyn.config',
  'timelyn.config',
  'timelyn.pages',
  'timelyn.auth',
  'timelyn.dashboard',
  'timelyn.timeline',
  'timelyn.actionFactory',
  'timelyn.alertFactory',
  'timelyn.breadcrumbFactory',
  'timelyn.eventFactory',
  'timelyn.mediaFactory',
  'timelyn.pathFactory',
  'timelyn.timelineFactory',
  'timelyn.userFactory'
])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}])

/*****************************************************************
*
* Lodash
*
******************************************************************/
.constant('_', window._)

/*****************************************************************
*
* Location override
*
******************************************************************/
// Implemented to reduce flickr on timeline routes
// disabled because it's causing more problems than it solves

// .run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
//     var original = $location.path;
//     $location.path = function (path, reload) {
//         if (reload === false) {
//             var lastRoute = $route.current;
//             var un = $rootScope.$on('$locationChangeSuccess', function () {
//                 $route.current = lastRoute;
//                 un();
//             });
//         }
//         return original.apply($location, [path]);
//     };
// }])

/*****************************************************************
*
* HTTP interceptor
*
******************************************************************/
.config(function ($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', function($q, $location, localStorageService) {
    return {
      request: function(config) {
        config.params = config.params || {};
        // config.headers = config.headers || {};
        if (localStorageService.get('jwt')) {
          config.params.access_token = localStorageService.get('jwt')
          // config.headers.access_token = localStorageService.get('jwt')
        }
        return config;
      },
      // responseError: function(response) {
      //   if(response.status === 401 || response.status === 403) {
      //     $location.path('/signin');
      //   }
      //   return $q.reject(response);
      // }
    };
  }]);
})
