import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import localStorage from './storage.js';

const playKey = 'videoplayer-current-time';
const delayTrottle = 1000;

const playerRef = document.querySelector('#vimeo-player');

const player = new Player(playerRef);

function savePlayTime(data) {
  localStorage.save(playKey, Math.floor(data.seconds));
}

player.on('timeupdate', throttle(savePlayTime, delayTrottle));

let loadedTime = localStorage.load(playKey);
if (loadedTime) {
  player.setCurrentTime(loadedTime);
}
