var appControllers = angular.module( 'appControllers', [ 'ngAnimate' ] );

appControllers.controller( 'startCtrl', [ '$scope', '$rootScope', function( $scope, $rootScope ) {
  $scope.pageClass = 'page-home';

} ] );

appControllers.controller( 'mainCtrl', [ '$scope', '$rootScope', function( $scope, $rootScope ) {
  $scope.pageClass = 'page-main';
  //Set the size of the cicules
  setSizeCircule();

  var points = 0;
  var level = 1;
  var lifes = ['heart','heart','heart','heart','heart',];
  var timer = 10;

  //Points
  $scope.points = points;
  $scope.lifes = lifes;
    console.log( lifes );

  var colorChoosen;

  $scope.setColorTypes = function()  {

    var colorName = [
      'Green',
      'Blue',
      'Yellow',
      'Red',
      'Purple',
      'Orange'
    ];
    var colorsShow = [
      '#e74c3c',//red
      '#3498db',//blue
      '#f1c40f',//green
      '#2ecc71',//Yellow
      '#9b59b6',//purple
      '#d35400'
    ];

    var colors = {
      'red': '#e74c3c',//red e74c3c
      'blue': '#3498db',//blue
      'green':'#2ecc71',//green
      'yellow':'#f1c40f',//Yellow
      'purple': '#9b59b6',
      'orange': '#d35400'
    };

    colorChoosen = colorName[Math.floor(Math.random() * colorName.length)];
    $scope.chooseColor = colorChoosen;

    var colorChoosenStyle = colorsShow[Math.floor(Math.random() * colorsShow.length)];
    $scope.colorChoosenStyle = colorChoosenStyle;
    $scope.colors = colors;

  }
    $scope.setColorTypes();

  //Reload route on click
  $scope.clickColor = function(event) {

    if( event == colorChoosen.toLowerCase() ) {

        //Correct response
        $scope.points = points+1;
        points = points+1;
        $scope.setColorTypes();
        $rootScope.reset();
    }else {

        //wrong response
        //Take life
        $rootScope.reset();
        lifes.shift();
        $scope.lifes = lifes;
        $scope.gameEnd();

    }

 };

 //Game end
 $scope.gameEnd = function() {
   if( lifes.length > 0 ) {
     $scope.setColorTypes();
   } else {
    console.log( 'taber' );
    $rootScope.stopGameTimer();
   }
 };

} ] );


appControllers.controller( 'timerCtrl', [ '$scope', '$timeout', '$rootScope', '$route', function( $scope, $timeout, $rootScope, $route ) {
    var counter = 10;
    var reset;
    $scope.counter = counter;
    var lifes      = $scope.lifes;

    $rootScope.countdown = function(counter) {

      reset = $timeout(function() {
      counter--;
      $scope.counter = counter;
        console.log( counter);
        console.log( lifes );

        if( counter <= 0 ) {

          lifes.shift();
          counter = 10;
          $scope.lifes = lifes;
          console.log( $scope.lifes );

          $scope.gameEnd();

        }
        if( lifes.length > 0 ){
            $scope.countdown(counter);
        }

       }, 1000);

    }

    $rootScope.reset = function() {
      $timeout.cancel(reset);
        var counter = 10;
        $scope.counter = 10;
        $scope.countdown( counter );
    }

    $rootScope.stopGameTimer = function() {
      $timeout.cancel(reset);
    }

    $scope.countdown(counter);

    $scope.$on('$routeChangeStart', function(next, current) {
        $rootScope.stopGameTimer();
    });

} ] );
