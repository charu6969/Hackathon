function uploadCap() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert('Please select an image to upload.');
    } else {
        const imageUrl = URL.createObjectURL(imageInput.files[0]); // Create a temporary URL for the image

        // Simulating the caption generation
        const caption = "A beautiful scenery with mountains and a river.";  // This can be dynamically generated

        // Store the image URL and caption in localStorage
        localStorage.setItem('imageUrl', imageUrl);
        localStorage.setItem('caption', caption);

        // Redirect to result page
        window.location.href = 'result.html';
    }
}