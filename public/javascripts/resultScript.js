window.onload = function() {
    const imageUrl = localStorage.getItem('imageUrl');  // This is where you store the image URL
    const caption = localStorage.getItem('caption');   // This is where you store the caption

    if (imageUrl) {
        document.getElementById('uploadedImage').src = imageUrl;
    }

    if (caption) {
        document.getElementById('generatedCaption').textContent = caption;
    }
};

// Function to convert the caption to audio
document.getElementById('convertToAudioButton').addEventListener('click', function() {
    const captionText = document.getElementById('generatedCaption').textContent;
    
    if (captionText) {
        const utterance = new SpeechSynthesisUtterance(captionText);
        speechSynthesis.speak(utterance);
    } else {
        alert('No caption available to convert to audio.');
    }
});