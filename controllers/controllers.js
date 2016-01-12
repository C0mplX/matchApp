var appControllers = angular.module( 'appControllers', [ 'ngAnimate' ] );

appControllers.controller( 'startCtrl', [ '$scope', function( $scope ) {
  $scope.pageClass = 'page-home';
} ] );

appControllers.controller( 'mainCtrl', [ '$scope', function( $scope ) {
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

  function setColorTypes() {

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
  setColorTypes();

  //Reload route on click
  $scope.reloadRoute = function(event) {

    if( event == colorChoosen.toLowerCase() ) {

        //Correct response
        $scope.points = points+1;
        points = points+1;
        setColorTypes();

    }else {

        //wrong response
        //Take life
        lifes.shift();
        $scope.lifes = lifes;
        if( lifes.length > 0 ) {
            setColorTypes();
        } else {
          alert( 'Taper' );
        }

    }

 };

} ] );

//Sets the size of the cicules
function setSizeCircule() {
  angular.element(document).ready(function () {
    $('.color-box').css('height', $('.color-box').width());
  });

  jQuery(window).resize(function () {
    $('.color-box').css('height', $('.color-box').width());
  });
}
