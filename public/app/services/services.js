angular.module('MIDIPlayer.services', [])

.factory('Keys', function() {
  var playNote = function(key) {

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
  

  var keyDownHandler = function(code, keyCodes) {
    if (keyCodes[code]) {
      $('#'+keyCodes[code].key).addClass('pressed');
      playNote([keyCodes[code].key]);
    }
  };

  var keyUpHandler = function(code, keyCodes) {
    if (keyCodes[code]) {
      $('#'+keyCodes[code].key).removeClass('pressed');
    }
  };

  return {
    playNote: playNote,
    keyDownHandler: keyDownHandler,
    keyUpHandler: keyUpHandler
  }
})
.factory('PlayerControls', function() {

  var play = function() {
    if (MIDI.Player.currentTime / MIDI.Player.endTime > .9999) {
      MIDI.Player.stop();
    }
    
    if (!MIDI.Player.currentTime) {
      MIDI.loadPlugin({
        soundfontUrl: "./examples/soundfont/",
        instrument: "acoustic_grand_piano",
        
        onsuccess: function() {    
          updatePlayer();
          MIDI.programChange(1, 0);
          var player = MIDI.Player;
          player.timeWarp = .3;
          player.loadFile("../examples/twinkle_twinkle.mid", function() {
            player.start();
            player.addListener(function(data) {
              var note = MIDI.noteToKey[data.note];
         
              if (data.message === 144) {
                $('#'+note).addClass('pressed');
              } else {
                $('#'+note).removeClass('pressed');
              }

            });
          });
        }
      });
    } else {
      MIDI.Player.resume();
    }

  };

  var updatePlayer = function() {
      // $('.player-track').width(500);

    MIDI.Player.setAnimation(function(data) {
      var percentComplete = data.now / data.end;
      if (percentComplete > 1) percentComplete = 1;

      $('.player-track').width(percentComplete * $('.player-track-full').width());

    })
  };

  return {
    play: play,
    updatePlayer: updatePlayer
  }
});