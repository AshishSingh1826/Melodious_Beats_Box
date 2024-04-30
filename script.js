
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Function to convert seconds to minutes:seconds format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

// List of songs
let songs = [
    {songName:"Aadat_Lo-fi", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    // Add other songs here
    {songName:"Aankhein Khuli", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Labon Ko KK", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"one_direction_night_changes_slow", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Saiyaara", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Tohre Me Base Raja Humro Paranwa Ho  Swati Mishra", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Baarish Ki Jaaye B Praak  Nawazuddin Siddiqui  Sunanda Sharma  Jaani", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Post Malone Swae Lee  Sunflower SpiderMan Into the SpiderVerse", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName:"Tere Bare Me Sochna Chhodha Vicky Singh ", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName:"Uska Hi Banana Slowed And Reverb  1920 Evil Returns", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
    {songName:"Middle Of The Night", filePath:"songs/11.mp3", coverPath:"covers/11.jpg"}
];

const updatePlayPauseIcons = () => {
    const allSongItemPlays = document.getElementsByClassName('songItemPlay');
    Array.from(allSongItemPlays).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

// Display song items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});

// Listen to timeupdate event
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Listen to input event of the seekbar (for smooth seeking)
myProgressBar.addEventListener('input', () => {
    // Update audio playback position while seeking
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Listen to change event of the seekbar (for final seek position)
myProgressBar.addEventListener('change', () => {
    // Update audio playback position after seeking
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to update play/pause icons for song items
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

// Add click event listeners to song items
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});

// Add click event listener to next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// Add click event listener to previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});



