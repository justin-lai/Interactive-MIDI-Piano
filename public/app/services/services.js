angular.module('MIDIPlayer.services', [])

.factory('Keys', function() {
  var playNote = function(key) {
    console.log(key);
    console.log(typeof key);

    var noteValue = MIDI.keyToNote[key];
    var noteDuration = Number(document.getElementsByClassName('noteDuration')[0].value);
    var noteDelay = Number(document.getElementsByClassName('noteDelay')[0].value);
    var noteVelocity = Number(document.getElementsByClassName('noteVelocity')[0].value);


    // console.log(noteValue + ' > ' + MIDI.noteToKey[noteValue]);
    MIDI.loadPlugin({
      soundfontUrl: "./examples/soundfont/",
      instrument: "acoustic_grand_piano",
      // instrument: "synth_drum",
      onprogress: function(state, progress) {
        // console.log(state, progress);
      },
      onsuccess: function() {
        var delay = noteDelay; // play one note every quarter second
        var note = noteValue; // the MIDI note
        var velocity = noteVelocity; // how hard the note hits
        // play the note
        // MIDI.programChange(0, 118); // Load "synth_drum" (118) into channel 0
        MIDI.setVolume(0, 127);
        MIDI.noteOn(0, note, velocity, delay);
        MIDI.noteOff(0, note, delay + noteDuration);
      }
    });   
  };
  
  var keyCodes = {
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
  }

  var keyDownHandler = function(code) {
    if (keyCodes[code]) {
      $('#'+keyCodes[code].key).addClass('pressed');
      playNote([keyCodes[code].key]);
    }
  };

  var keyUpHandler = function(code) {
    if (keyCodes[code]) {
      $('#'+keyCodes[code].key).removeClass('pressed');
    }
  };




  return {
    playNote: playNote,
    keyDownHandler: keyDownHandler,
    keyUpHandler: keyUpHandler
  }
});