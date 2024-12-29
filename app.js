document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const audioList = document.getElementById('audioList');

    audioList.innerHTML = ''; // Clear previous list

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('audio/')) {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;

                const playButton = document.createElement('button');
                playButton.textContent = 'Play';
                playButton.onclick = () => playAudio(file);

                listItem.appendChild(playButton);
                audioList.appendChild(listItem);
            }
        });
    } else {
        const error = document.createElement('p');
        error.classList.add('error');
        error.textContent = 'Please select audio files.';
        audioList.appendChild(error);
    }
});

const audioPlayer = document.getElementById('audioPlayer');

function playAudio(file) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();
}
