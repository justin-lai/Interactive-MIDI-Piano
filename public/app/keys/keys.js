angular.module('MIDIPlayer.keys', [])

.controller('KeysController', function($scope, Keys) {
  $scope.data = {
    // keys: MIDI.keyToNote
    notes: [],
    keys: []
  }

  for (var i = 21; i <= 108; i++) {
    $scope.data.notes.push(i);
    $scope.data.keys.push(MIDI.noteToKey[i]);
  }

  $scope.keyColor = function(key) {
    return key.indexOf('b') === -1 ? 'whiteKey' : 'blackKey'; 
  }

  $scope.keydown = function(keyEvent) {
    Keys.keyPressHandler(keyEvent.keyCode);
  }

  $scope.playNote = Keys.playNote;
})
