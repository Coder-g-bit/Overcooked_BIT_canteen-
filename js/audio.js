function playAudio(AudioID) {
  var audio = document.getElementById(AudioID);
  audio.play();
}

function pauseAudio(AudioID) {
  var audio = document.getElementById(AudioID);
  audio.pause();
}

function stopAudio(AudioID) {
  var audio = document.getElementById(AudioID);
  audio.pause();
  audio.currentTime = 0;
}

function volumeDown(AudioID, v) {
  var audio = document.getElementById(AudioID);
  audio.volume = v;
}