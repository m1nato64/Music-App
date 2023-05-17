const image = document.getElementById('cover'),
    title = document.getElementById('musicTitle'),
    artist = document.getElementById('musicArtist'),
    currentTimeElement = document.getElementById('currentTime'),
    durationElement = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('playerProgress'),
    previousBtn = document.getElementById('prev'),
    playBtn = document.getElementById('play'),
    nextBtn = document.getElementById('next')
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    // MARK: Songs array
    {
        // MARK: Carousel - Aires
        path: 'music-imgs/Carousel.mp3',
        displayName: 'Carousel',
        cover: 'music-img/aires.jpeg', 
        artist: 'Aires',
    },

    {
        // MARK: Benz Truck - Lil Peep
        path: 'music-imgs/Benz Truck.mp3',
        displayName: 'Benz Truck',
        cover: 'music-img/lil-peep.jpg', 
        artist: 'Lil Peep',
    },

    {
        // MARK: Matt Hardy 999 - Juice Wrld
        path: 'music-imgs/Matt Hardy 999.mp3',
        displayName: 'Matt Hardy 999',
        cover: 'music-img/juice-wrld_2.jpg', 
        artist: 'Juice Wrld',
    },

    {
        // MARK: Falling Down - Lil Peep
        path: 'music-imgs/Falling Down.mp3',
        displayName: 'Falling Down',
        cover: 'music-img/lil-peep.jpg', 
        artist: 'Lil Peep',
    },

    {
        // MARK: Red Roses - Lil Skies
        path: 'music-imgs/Red Roses.mp3',
        displayName: 'Red Roses',
        cover: 'music-img/lil-skies.jpg', 
        artist: 'Lil Skies',
    },

];

let musicIndex = 0;
let isPlaying = false;

// MARK: Toggle play function logic
function togglePlay() {
    if(isPlaying) {
        pauseMusic(); 
    } else {
        playMusic();
    } 
}

// MARK: Music play function logic
function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// MARK: Music pause function logic
function pauseMusic() {
    isPlaying = false;
    // Same with playMusic func
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Same with playMusic func
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// MARK: Load music function logic
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// MARK: Change music function logic
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.lenght) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// MARK: Update music progress bar function logic
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationElement.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeElement.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


