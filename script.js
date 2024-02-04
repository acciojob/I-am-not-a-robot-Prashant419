//your code here
const images = document.querySelectorAll('img');
const h3 = document.getElementById('h');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

let clickedImages = []; // Array to store clicked images

// Load images randomly on page load
window.addEventListener('load', () => {
  const imageUrls = generateUniqueImageUrls(); // Function to generate unique and repeated URLs
  images.forEach((image, index) => {
    image.src = imageUrls[index];
  });
});

// Handle image click events
images.forEach(image => {
  image.addEventListener('click', () => {
    if (clickedImages.length === 0) {
      // Show reset button on first click
      resetButton.style.display = 'block';
    }

    if (clickedImages.length === 1 && clickedImages[0] !== image) {
      // Only allow two clicks and ensure they're different
      clickedImages.push(image);
      verifyButton.style.display = 'block';
    } else if (clickedImages.length === 2) {
      // No more clicking after two selections
      clickedImages = [];
      resetButton.style.display = 'none';
      verifyButton.style.display = 'none';
    }

    clickedImages.forEach(clickedImage => {
      clickedImage.classList.add('clicked'); // Visually highlight clicked images
    });
  });
});

// Reset button event handler
resetButton.addEventListener('click', () => {
  clickedImages = [];
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.textContent = '';
  images.forEach(image => image.classList.remove('clicked')); // Remove click highlights
});

// Verify button event handler
verifyButton.addEventListener('click', () => {
  verifyButton.style.display = 'none'; // Prevent multiple clicks

  if (clickedImages[0].src === clickedImages[1].src) {
    para.textContent = 'You are a human. Congratulations!';
  } else {
    para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
  }

  clickedImages = []; // Reset for next verification
});

// Function to generate unique and repeated image URLs
function generateUniqueImageUrls() {
  const uniqueUrls = [];
  const numImages = 6; // Total number of images
  const repeatIndex = Math.floor(Math.random() * (numImages - 1)); // Random index for repetition

  for (let i = 0; i < numImages; i++) {
    // Generate unique URLs randomly
    let url = 'https://placeimg.com/300/300/animals?random=' + Math.random();