'use strict'

const galleryContainer = document.querySelector('.gallery-container')
const memeEditor = document.getElementById('meme-editor')

// Function to load images into the gallery
function loadGallery() {
  const images = []
  
  for (let i = 1; i <= 18; i++) {
    images.push(`img/${i}.jpg`)
  }
  
  images.forEach(imgSrc => {
    const elImge = document.createElement('img')
    elImge.src = imgSrc
    elImge.alt = 'Meme Image'
    elImge.classList.add('gallery-img')
    
    elImge.style.width = '100px' // Adjust size as needed
    elImge.style.height = 'auto' // Maintain aspect ratio
    
    elImge.addEventListener('click', () => {
      selectImage(imgSrc) // Calls selectImage from memeController
      memeEditor.style.display = 'block' // Show the meme editor
    })
    
    galleryContainer.appendChild(elImge)
  })
}

// Function to handle navigation link clicks
function handleNavClick(event) {
    const target = event.target;
  
    if (target.textContent === 'Gallery') {
      galleryContainer.style.display = 'flex'; // Show the gallery
      memeEditor.style.display = 'none'; // Hide the editor
    } else if (target.textContent === 'Memes') {
      // Not ready yet
    } else if (target.textContent === 'About') {
      // Not ready yet
    }
  }

loadGallery()
