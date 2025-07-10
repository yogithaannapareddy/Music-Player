const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const title = document.getElementById('song-title');
const artist = document.getElementById('song-artist');
const playlist = document.getElementById('playlist');

const songs = [
  { title: "Song 1", artist: "Artist A", file: "songs/song1.mp3" },
  { title: "Song 2", artist: "Artist B", file: "songs/song2.mp3" },
  { title: "Song 3", artist: "Artist C", file: "songs/song3.mp3" }
];

let currentSong = 0;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
}

function playPauseSong() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
}

function changeSong(step) {
  currentSong = (currentSong + step + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = '⏸';
}

playBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', () => changeSong(-1));
nextBtn.addEventListener('click', () => changeSong(1));

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

playlist.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    currentSong = Number(e.target.dataset.index);
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = '⏸';
  }
});

// Initialize
loadSong(currentSong);
audio.volume = 0.5;ss