angular.module('MIDIPlayer.keys', [])

.controller('KeysController', function($scope, Keys) {
  $scope.data = {
    notes: [],
    keys: [],
    keyCodes: {
      '65': {keyboard: 'a', key: 'C5' },
      '87': {keyboard: 'w', key: 'Db5' },
      '83': {keyboard: 's', key: 'D5' },
      '69': {keyboard: 'e', key: 'Eb5' },
      '68': {keyboard: 'd', key: 'E5' },
      '70': {keyboard: 'f', key: 'F5' },
      '84': {keyboard: 't', key: 'Gb5' },
      '71': {keyboard: 'g', key: 'G5' },
      '89': {keyboard: 'y', key: 'Ab5' },
      '72': {keyboard: 'h', key: 'A5' },
      '85': {keyboard: 'u', key: 'Bb5' },
      '74': {keyboard: 'j', key: 'B5' },
      '75': {keyboard: 'k', key: 'C6' },
      '79': {keyboard: 'o', key: 'Db6' },
      '76': {keyboard: 'l', key: 'D6' },
      '80': {keyboard: 'p', key: 'Eb6' },  
      '186': {keyboard: ';', key: 'E6' }
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
      Keys.keyDownHandler(keyEvent.keyCode, $scope.data.keyCodes);
      $scope.data.keysPressed[key] = true;
    }
  }

  $scope.keyup = function(keyEvent) {
    var key = $scope.data.keyCodes[keyEvent.keyCode].key;
    Keys.keyUpHandler(keyEvent.keyCode, $scope.data.keyCodes);
    if ($scope.data.keysPressed[key]) {
      delete $scope.data.keysPressed[key];
    }
  }

  $scope.keyboardKey = function(key) {
    for (var k in $scope.data.keyCodes) {
      if ($scope.data.keyCodes[k].key === key) {
        return $scope.data.keyCodes[k].keyboard;
      }
    }
  };

  $scope.playNote = Keys.playNote;


  $scope.init();
})
