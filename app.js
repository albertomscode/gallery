// DOM Element Selection
const gallery = document.querySelectorAll(".gallery img");
const displayImage = document.getElementById("displayImage");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const announcer = document.getElementById("announcer");

let currentIndex = 0; // Initialize a variable to track the index of the current image

// Functions for Gallery Handling
function changeImage(offset) {
    currentIndex += offset;
    if (currentIndex < 0) {
        currentIndex = gallery.length - 1;
    } else if (currentIndex >= gallery.length) {
        currentIndex = 0;
    }
    updateDisplayImage(); // Call the function to update the displayed image
}

function updateDisplayImage() {
    const selectedImage = gallery[currentIndex];
    displayImage.src = selectedImage.src;
    displayImage.alt = selectedImage.alt;

    displayImage.focus(); // Set focus on the newly displayed image
    console.log(`Image focused: ${selectedImage.alt}`); // Log to the console with the alt text of the image

    // Show announcer with image information
    showAnnouncer(`Image ${currentIndex + 1}: ${selectedImage.alt}`);
}

function handleImageChange(offset) {
    changeImage(offset);
    updateDisplayImage();
}

// Function to show the announcer
function showAnnouncer(message) {
    announcer.textContent = message;
    announcer.style.display = "block"; // Show the announcer
    setTimeout(() => {
        announcer.style.display = "none"; // Hide the announcer after 3 seconds (you can adjust the time)
    }, 5000);
}

// Event Listeners for Button Navigation
prevButton.addEventListener("click", () => handleImageChange(-1));
nextButton.addEventListener("click", () => handleImageChange(1));

// Event Listener for Arrow Key Navigation
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        handleImageChange(-1);
    } else if (event.key === "ArrowRight") {
        handleImageChange(1);
    }
});

// Event Listeners for Thumbnails
gallery.forEach((thumb, index) => {
    thumb.addEventListener("click", () => handleThumbnailClick(index));
    thumb.addEventListener("keydown", (event) => handleThumbnailKeydown(event, index));

    thumb.setAttribute("tabindex", "0"); // Make each thumbnail focusable with the keyboard
});

// Function to handle click on thumbnail
function handleThumbnailClick(index) {
    currentIndex = index;
    updateDisplayImage();
}

// Function to handle key press on thumbnail
function handleThumbnailKeydown(event, index) {
    if (event.key === "Enter" || event.key === " ") {
        currentIndex = index;
        updateDisplayImage();
    }
}
