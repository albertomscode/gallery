const gallery = document.querySelectorAll(".gallery img");
const displayImage = document.getElementById("displayImage");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentIndex = 0;

function changeImage(offset) {
    currentIndex += offset;
    if (currentIndex < 0) {
        currentIndex = gallery.length - 1;
    } else if (currentIndex >= gallery.length) {
        currentIndex = 0;
    }
    updateDisplayImage();
}

function updateDisplayImage() {
    const selectedImage = gallery[currentIndex];
    displayImage.src = selectedImage.src;
    displayImage.alt = selectedImage.alt;

    displayImage.focus(); // Focus on the newly displayed image
    console.log(`Image focused: ${selectedImage.alt}`); // Log to the console
}

prevButton.addEventListener("click", () => changeImage(-1));
nextButton.addEventListener("click", () => changeImage(1));

// Keyboard navigation
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        changeImage(-1);
    } else if (event.key === "ArrowRight") {
        changeImage(1);
    }
});

// Add focus event for each image in the gallery
gallery.forEach((thumb, index) => {
    thumb.addEventListener("focus", () => {
        currentIndex = index;
        updateDisplayImage();
    });
});
