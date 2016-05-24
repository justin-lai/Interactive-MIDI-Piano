angular.module('MIDIPlayer.player', [])

.controller('PlayerController', function($scope, PlayerControls){
  var player = MIDI.Player;
  $scope.files = ['summer.mid', 'twinkle_twinkle.mid'];

  $scope.play = PlayerControls.play;
  $scope.pause = player.pause;
  $scope.stop = player.stop;

  $scope.trackWidth = 0;
});