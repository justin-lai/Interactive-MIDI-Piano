angular.module('MIDIPlayer.keys', [])

.controller('KeysController', function($scope, Keys) {
  $scope.data = {
    notes: [],
    keys: [],
    keyCodes: {
      '65': {keyboard: 'a', key: 'C3' },
      '87': {keyboard: 'w', key: 'Db3' },
      '83': {keyboard: 's', key: 'D3' },
      '69': {keyboard: 'e', key: 'Eb3' },
      '68': {keyboard: 'd', key: 'E3' },
      '70': {keyboard: 'f', key: 'F3' },
      '85': {keyboard: 'u', key: 'Gb3' },
      '32': {keyboard: 'space', key: 'G3' },
      '73': {keyboard: 'i', key: 'Ab3' },
      '74': {keyboard: 'j', key: 'A3' },
      '79': {keyboard: 'o', key: 'Bb3' },
      '75': {keyboard: 'k', key: 'B3' },
      '76': {keyboard: 'l', key: 'C4' },
      '80': {keyboard: 'p', key: 'Db3' },
      '186': {keyboard: ';', key: 'D4' },      
    },
    keysPressed: {}
  }

  $scope.init = function() {
    for (var i = 21; i <= 108; i++) {
      $scope.data.notes.push(i);
      $scope.data.keys.push(MIDI.noteToKey[i]);
    }
  }

  $scope.keyColor = function(key) {
    return key.indexOf('b') === -1 ? 'whiteKey' : 'blackKey'; 
  }

  $scope.keydown = function(keyEvent) {
    var key = $scope.data.keyCodes[keyEvent.keyCode].key;
    if (!$scope.data.keysPressed[key]) {
      Keys.keyDownHandler(keyEvent.keyCode);
      $scope.data.keysPressed[key] = true;
      console.log($scope.data.keysPressed);
    }
  }

  $scope.keyup = function(keyEvent) {
    var key = $scope.data.keyCodes[keyEvent.keyCode].key;
    Keys.keyUpHandler(keyEvent.keyCode);
    if ($scope.data.keysPressed[key]) {
      console.log('key deleted');
      console.log($scope.data.keysPressed);
      delete $scope.data.keysPressed[key];
    }
  }

  $scope.playNote = Keys.playNote;


  $scope.init();
})
