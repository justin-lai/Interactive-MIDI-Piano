angular.module('MIDIPlayer.player', [])

.controller('PlayerController', function($scope, PlayerControls){
  var player = MIDI.Player;
  $scope.files = ['twinkle_twinkle.mid', 'summer.mid', 'bumble_bee.mid'];

  $scope.play = PlayerControls.play;
  $scope.pause = player.pause;
  $scope.stop = player.stop;
  $scope.setTime = function(event) {
    var percent = event.offsetX / $('#player-track-full').width();
    $scope.stop();
    MIDI.Player.currentTime = percent * MIDI.Player.endTime;
    $scope.play();
  }



});