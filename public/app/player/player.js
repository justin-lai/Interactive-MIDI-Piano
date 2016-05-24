angular.module('MIDIPlayer.player', [])

.controller('PlayerController', function($scope, PlayerControls){
  var player = MIDI.Player;
  $scope.files = ['summer.mid', 'twinkle_twinkle.mid']

  $scope.play =PlayerControls.play;
  $scope.pause = player.pause;
  $scope.stop = player.stop;

  $scope.percentComplete = 0;
  $scope.getTime = function() {
    $scope.percentComplete = Math.round(player.currentTime / player.endTime * 100) + '%'; 
    return player.currentTime;
  }

  $scope.trackWidth = 0;
});