document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files; // Get all files in the selected folder
    const audioList = document.getElementById('audioList');
    
    audioList.innerHTML = ''; // Clear previous list

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('audio/')) { // Ensure it's an audio file
                const listItem = document.createElement('li');
                listItem.textContent = file.webkitRelativePath; // Show the relative path of the file

                // Create a play button for each audio file
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
        error.textContent = 'Please select a folder containing audio files.';
        audioList.appendChild(error);
    }
});

const audioPlayer = document.getElementById('audioPlayer');

function playAudio(file) {
    const url = URL.createObjectURL(file); // Create a URL for the selected file
    audioPlayer.src = url;
    audioPlayer.play();

    audioPlayer.onended = () => {
        const nextItem = getNextAudio(file);
        if (nextItem) {
            playAudio(nextItem);
        }
    };
}

function getNextAudio(currentFile) {
    const files = Array.from(document.getElementById('fileInput').files);
    const currentIndex = files.findIndex(file => file.webkitRelativePath === currentFile.webkitRelativePath);
    return currentIndex >= 0 && currentIndex < files.length - 1 ? files[currentIndex + 1] : null; // Return next file or null
}
