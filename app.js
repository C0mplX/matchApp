var app = angular.module( 'app', [
  'ngRoute',
  'appControllers',
  'ngAnimate'
] );

app.config( ['$routeProvider',
  function( $routeProvider ) {
    $routeProvider.
    when( '/', {
      templateUrl: 'view/start.html',
      controller: 'startCtrl'
    } )
    .when( '/main', {
      templateUrl: 'view/main.html',
      controller: 'mainCtrl'
    } );
  }
] );
