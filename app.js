const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

// MARK: Songs array
const songs = [

    {
        // MARK: Benz Truck - Lil Peep
        path: 'data/BenzTruck.mp3',
        displayName: 'Benz Truck',
        cover: 'data/lil-peep.jpg',
        artist: 'Lil Peep',
    },

    {
        // MARK: Carousel - Aires
        path: 'data/Carousel.mp3',
        displayName: 'Carousel',
        cover: 'data/aires.jpeg',
        artist: 'Aires',
    },

    {
        // MARK: Matt Hardy 999 - Juice Wrld
        path: 'data/MattHardy999.mp3',
        displayName: 'Matt Hardy 999',
        cover: 'data/tripple-redd.jpg',
        artist: 'Tripple Redd',
    },

    {
        // MARK: Falling Down - Lil Peep
        path: 'data/FallingDown.mp3',
        displayName: 'Falling Down',
        cover: 'data/lil-peep.jpg',
        artist: 'Lil Peep',
    },

    {
        // MARK: Red Roses - Lil Skies
        path: 'data/Roses.mp3',
        displayName: 'Red Roses',
        cover: 'data/lil-skies.jpg',
        artist: 'Lil Skies',
    },

    {
        // MARK: In The End - Linkin Park
        path: 'data/InTheEnd.mp3',
        displayName: 'In The End',
        cover: 'data/linkin-park.jpg',
        artist: 'Linkin Park',
    },

    {
        // MARK: Jocelyn Flores - XXXTentacion
        path: 'data/JocelnFlores.mp3',
        displayName: 'Jocelyn Flores',
        cover: 'data/xxxtentacion.jpg',
        artist: 'XXXTentacion',
    },

    {
        // MARK: Miss The Rage - Playboi Carty
        path: 'data/MissTheRage.mp3',
        displayName: 'Miss The Rage',
        cover: 'data/playboi-carti.jpg',
        artist: 'Playboi Carty',
    },

    {
        // MARK: Breking The Habit - Linkin Park
        path: 'data/BreakingTheHabbit.mp3',
        displayName: 'Breaking The Habit',
        cover: 'data/linkin-park_2.jpg',
        artist: 'Linkin Park',
    },

    {
        // MARK: кладбище - вышел покурить.
        path: 'data/кладбище.mp3',
        displayName: 'кладбище',
        cover: 'data/vishel-pokurit.jpg',
        artist: 'вышел покурить.',
    },

    {
        // MARK: In Aeternum - Fleshgod Apocalypse
        path: 'data/InAeternum.mp3',
        displayName: 'In Aeternum',
        cover: 'data/fleshgod-apocalypse.jpg',
        artist: 'Fleshgod Apocalypse',
    },

    {
        // MARK: Floor Seats - Moxas
        path: 'data/floorseats.mp3',
        displayName: 'Floor Seats',
        cover: 'data/moxas.jpg',
        artist: 'Moxas',
    },
];

let musicIndex = 0;
let isPlaying = false;

// MARK: Toggle play function logic
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// MARK: Music play function logic
function playMusic() {
    isPlaying = true;
    // Change play button icon {Update for animation}
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// MARK: Music pause function logic
function pauseMusic() {
    isPlaying = false;
    // Same with playMusic func {Update for animation}
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Same with playMusic func
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// MARK: Load music function logic
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// MARK: Change music function logic
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// MARK: Update music progress bar function logic
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