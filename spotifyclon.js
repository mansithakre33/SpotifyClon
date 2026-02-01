const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const seek = document.getElementById('seek');
const volume = document.getElementById('volume');
const currentTimeEl = document.querySelector('.time.current');
const totalTimeEl = document.querySelector('.time.total');

if(audio){
  // volume init
  audio.volume = Number(volume.value);

  // play/pause toggle
  playBtn.addEventListener('click', () => {
    if(audio.paused){
      audio.play();
      playBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  });

  // update duration / seek
  audio.addEventListener('loadedmetadata', () => {
    seek.max = Math.floor(audio.duration);
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    seek.value = Math.floor(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  seek.addEventListener('input', () => {
    audio.currentTime = seek.value;
  });

  volume.addEventListener('input', () => {
    audio.volume = volume.value;
  });
}

function formatTime(sec){
  if(isNaN(sec)) return '0:00';
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}