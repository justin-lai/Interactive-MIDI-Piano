angular.module('MIDIPlayer.player', [])

.controller('PlayerController', function($scope, PlayerControls){
  var player = MIDI.Player;
  $scope.percentComplete = 0;

  $scope.play =PlayerControls.play;
  $scope.pause = player.pause;
  $scope.stop = player.stop;

  $scope.getTime = function() {
    $scope.percentComplete = Math.round(player.currentTime / player.endTime * 100) + '%'; 
    return player.currentTime;
  }
});