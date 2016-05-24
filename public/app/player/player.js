angular.module('MIDIPlayer.player', [])

.controller('PlayerController', function($scope){
  $scope.play = MIDI.Player.resume;
  
  $scope.pause = MIDI.Player.pause;
  
});