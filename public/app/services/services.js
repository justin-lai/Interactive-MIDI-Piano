angular.module('MIDIPlayer.services', [])

.factory('Keys', function() {
  var playNote = function(key) {
    var noteValue = MIDI.keyToNote[key];
    var noteDuration = Number(document.getElementsByClassName('noteDuration')[0].value);
    var noteDelay = Number(document.getElementsByClassName('noteDelay')[0].value);
    var noteVelocity = Number(document.getElementsByClassName('noteVelocity')[0].value);


    console.log(noteValue + ' > ' + MIDI.noteToKey[noteValue]);
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
  }
  
  return {
    playNote: playNote
  }
});