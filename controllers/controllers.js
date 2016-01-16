var appControllers = angular.module( 'appControllers', [ 'ngAnimate' ] );

appControllers.controller( 'startCtrl', [ '$scope', '$rootScope', function( $scope, $rootScope ) {
  $scope.pageClass = 'page-home';

} ] );

appControllers.controller( 'mainCtrl', [ '$scope', '$rootScope', '$location', function( $scope, $rootScope, $location ) {
  $scope.pageClass = 'page-main';
  //Set the size of the cicules
  setSizeCircule();

  var points = 0;
  var level = 1;
  var lifes = ['heart','heart','heart','heart','heart'];
  $scope.bricks = [];
  $scope.showHighScore = localStorage.getItem( 'highscore' );

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

    var colors = [
      {name: 'red',     bg: '#e74c3c'},//red e74c3c
      {name: 'blue',    bg: '#3498db'},//blue
      {name: 'green',   bg: '#2ecc71'},//green
      {name: 'yellow',  bg: '#f1c40f'},//Yellow
      {name: 'purple',  bg: '#9b59b6'},
      {name: 'orange',  bg: '#d35400'}
    ];

    colorChoosen = colorName[Math.floor(Math.random() * colorName.length)];
    $scope.chooseColor = colorChoosen;

    var colorChoosenStyle = colorsShow[Math.floor(Math.random() * colorsShow.length)];
    $scope.colorChoosenStyle = colorChoosenStyle;




    function shuffle(o) {
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    if( $scope.points > 10 ) {
        var shuffit = shuffle( colors )
    }

    $scope.bricks =  colors;

  }
  $scope.setColorTypes();


  //Reload route on click
  $scope.clickColor = function(event) {

    if( event == colorChoosen.toLowerCase() ) {

        //Correct response
        $scope.points = points+1;
        points = points+1;
        $scope.setColorTypes();
        $scope.addTime();
        //$rootScope.reset();
    }else {

        //wrong response
        //Take life
        //$rootScope.reset();
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
    $scope.setHighScore();
   }
 };

//Function to add time after a certen point gain
 $scope.addTime = function() {

   if( $scope.points > 40 ) {
     $scope.reset( 2 );
   }

 }

 $scope.setHighScore = function() {
   $rootScope.stopGameTimer();

   var highScore = localStorage.getItem( 'highscore' );
   if( highScore < $scope.points ) {
       localStorage.setItem( 'highscore', $scope.points );
   }
   localStorage.setItem( 'nowScore', $scope.points );

   $location.path( '/end' );
 }

} ] );

appControllers.controller( 'timerCtrl', [ '$scope', '$timeout', '$rootScope', '$route', function( $scope, $timeout, $rootScope, $route ) {
    var counter = 100;
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
          //counter = 10;
          $scope.lifes = lifes;
          console.log( $scope.lifes );

          $scope.setHighScore();

        }
        if( lifes.length > 0 ){
            $scope.counterAmount = counter;
            $scope.countdown(counter);
        }

      }, $scope.dificulty() );

    }

    $scope.dificulty = function() {

      if( $scope.points >= 15 && $scope.points < 30 ) {
        return 500;
      }
      else if( $scope.points >= 30 && $scope.points < 40 ) {
        return 400;
      }
      else if( $scope.points >= 40 && $scope.points < 60 ) {
        return 300;
      }
      else if( $scope.points >= 60 && $scope.points < 80 ) {
        return 300;
      }
      else if( $scope.points >= 80 ) {
        return 200;
      }
      else {
        return 1000;
      }

    }

    $rootScope.reset = function( time ) {
      $timeout.cancel(reset);

          var counter =   $scope.counterAmount +time;
          $scope.counter =   $scope.counterAmount+time;
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

//End controller
appControllers.controller( 'endCtrl', [ '$scope', '$rootScope', function( $scope, $rootScope ) {
  $scope.pageClass = 'page-end';

  $scope.score = localStorage.getItem( 'nowScore' );
  $scope.showHighScore = localStorage.getItem( 'highscore' );

} ] );
