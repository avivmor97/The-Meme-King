'use strict'

const galleryContainer = document.querySelector('.gallery-container')
const gallerySection = document.querySelector('.image-gallery')
const memeEditor = document.getElementById('meme-editor')

window.onload = () => {
    loadGallery() 
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
}

// Function to handle navigation link clicks
function handleNavClick(event) {
    const target = event.target

    if (target.textContent === 'Gallery') {
        showGallery() 
    } else if (target.textContent === 'Memes') {
        // Not ready yet
    } else if (target.textContent === 'About') {
        // Not ready yet
    }
}

// Add event listener to the nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => link.addEventListener('click', handleNavClick));


