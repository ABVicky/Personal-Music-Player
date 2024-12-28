const fileInput = document.getElementById('fileInput');
const audioList = document.getElementById('audioList');
const audioPlayer = document.getElementById('audioPlayer');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const errorElement = document.getElementById('error');

let repeatMode = false;
let shuffled = false;

// Dropdown toggle
dropdownBtn.addEventListener('click', () => {
    dropdownMenu.parentElement.classList.toggle('show');
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;

    audioList.innerHTML = '';
    errorElement.textContent = '';

    Array.from(files).forEach(file => {
        if (file.type.startsWith('audio/')) {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            listItem.classList.add('track-item');

            const playButton = document.createElement('button');
            playButton.textContent = '▶';
            playButton.onclick = () => playAudio(file);

            listItem.appendChild(playButton);
            audioList.appendChild(listItem);
        } else {
            errorElement.textContent = 'Some files were not added as they are not valid audio files.';
        }
    });
});

audioPlayer.onended = () => {
    if (repeatMode) {
        audioPlayer.play(); 
    } else {
        const nextFile = getNextAudio();
        if (nextFile) {
            playAudio(nextFile);
        }
    }
};

shuffleBtn.addEventListener('click', () => {
    shuffled = !shuffled;
    shuffleBtn.textContent = `Shuffle: ${shuffled ? 'On' : 'Off'}`;
});

repeatBtn.addEventListener('click', () => {
    repeatMode = !repeatMode;
    repeatBtn.textContent = `Repeat: ${repeatMode ? 'On' : 'Off'}`;
});

function playAudio(file) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();

    highlightCurrentTrack(file.name);
}

function getNextAudio() {
    const files = Array.from(fileInput.files);
    if (shuffled) {
        const remainingFiles = files.filter(file => file.name !== audioPlayer.src.split('/').pop());
        return remainingFiles[Math.floor(Math.random() * remainingFiles.length)];
    }

    const currentIndex = files.findIndex(file => file.name === audioPlayer.src.split('/').pop());
    return currentIndex >= 0 && currentIndex < files.length - 1 ? files[currentIndex + 1] : null;
}

function highlightCurrentTrack(fileName) {
    const tracks = document.querySelectorAll('.track-item');
    tracks.forEach(track => {
        if (track.textContent.includes(fileName)) {
            track.style.backgroundColor = '#f0e68c';
        } else {
            track.style.backgroundColor = '';
        }
    });
}





