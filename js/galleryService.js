'use strict'

const galleryContainer = document.querySelector('.gallery-container')
const savedMemesContainer = document.querySelector('.saved-memes-container') // New container for saved memes
const gallerySection = document.querySelector('.image-gallery')
const memeEditor = document.getElementById('meme-editor')

// Simulating saved memes for demonstration purposes
const savedMemes = [] // This should be populated with the actual saved meme URLs

window.onload = () => {
    loadGallery() 
    loadSavedMemes(savedMemes) // Load saved memes on page load
    showGallery() 
    memeEditor.style.display = 'none' 
}

function loadGallery() {
    const images = []

    for (let i = 1; i <= 18; i++) {
        images.push(`img/${i}.jpg`)
    }

    images.forEach(imgSrc => {
        const elImage = document.createElement('img')
        elImage.src = imgSrc
        elImage.alt = 'Meme Image'
        elImage.classList.add('gallery-img')

        elImage.style.width = '100%'
        elImage.style.height = 'auto' 

        elImage.addEventListener('click', () => {
            selectImage(imgSrc) 
            hideGallery() 
            memeEditor.style.display = 'block' 
            document.querySelector('.saved-memes-section').style.display = 'none' // Hide saved memes section when editor is open
        })

        galleryContainer.appendChild(elImage)
    })
}



function hideGallery() {
    gallerySection.style.display = 'none' 
}

function showGallery() {
    gallerySection.style.display = 'block' 
    memeEditor.style.display = 'none' 
    document.querySelector('.saved-memes-section').style.display = 'none' // Hide saved memes section when showing gallery
}

// Function to handle navigation link clicks
function handleNavClick(event) {
    const target = event.target

    if (target.textContent === 'Gallery') {
        showGallery() 
    } else if (target.textContent === 'Memes') {
        hideGallery() 
        memeEditor.style.display = 'none' 
        document.querySelector('.saved-memes-section').style.display = 'block' // Show the saved memes section
    } else if (target.textContent === 'About') {
        // Not ready yet
    }
}

// Add event listener to the nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => link.addEventListener('click', handleNavClick));
