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
    } )
    .when( '/end', {
      templateUrl: 'view/end.html',
      controller: 'endCtrl'
    } );
  }
] );
//Sets the size of the cicules
function setSizeCircule() {
  angular.element(document).ready(function () {
    $('.color-box').css('height', $('.color-box').width());
  });

  jQuery(window).resize(function () {
    $('.color-box').css('height', $('.color-box').width());
  });
}
