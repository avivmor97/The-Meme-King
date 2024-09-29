'use strict'

const savedMemesSection = document.querySelector('.saved-memes-section') 

// Initially hide the saved memes section
savedMemesSection.style.display = 'none'

window.addEventListener('load', () => {
    renderSavedMemes()
})



// Function to save a meme to local storage
function saveMeme(meme) {
    const memes = loadFromStorage('savedMemes') || []
    memes.push(meme)
    saveToStorage('savedMemes', memes)
}

function renderSavedMemes() {
    const memes = loadFromStorage('savedMemes');

    if (!memes || memes.length === 0) {
        savedMemesContainer.innerHTML = '<p>No saved memes yet!</p>';
        return;
    }

    savedMemesContainer.innerHTML = '';

    memes.forEach(meme => {
        const elImageContainer = document.createElement('div');
        elImageContainer.classList.add('meme-container');

        const elImage = document.createElement('img');
        elImage.src = meme.imgUrl; // Use imgUrl from meme object
        elImage.alt = 'Saved Meme Image';

        elImage.addEventListener('click', () => {
            selectImage(meme.imgUrl); // Load the selected saved meme
            hideGallery();
            memeEditor.style.display = 'block'; 
            savedMemesSection.style.display = 'none'; // Hide saved memes section when editor is open
        });

        elImageContainer.appendChild(elImage);
        savedMemesContainer.appendChild(elImageContainer);
    });
}

// Function to get the canvas image
function getCanvasImage() {
    const canvas = document.querySelector('.meme-canvas')
    if (!canvas) {
        console.error('Canvas not found! Please check the canvas class.')
        return null
    }
    return canvas.toDataURL('image/png')
}

// Event listener for saving memes when the button is clicked
document.querySelector('.save-meme-btn').addEventListener('click', onSaveMeme)

function onSaveMeme() {
    // Get the image URL from the canvas
    const memeImageUrl = getCanvasImage()
    if (!memeImageUrl) {
        console.error('No image URL found. Please select an image before saving.')
        return // Exit if no image is selected
    }

    const meme = getMemeDataFromEditor()
    meme.imgUrl = memeImageUrl // Set the image URL from the canvas

    // Log the meme object before saving
    console.log('Meme to be saved:', meme)

    saveMeme(meme)
    renderSavedMemes()
}

// Function to get meme data from the editor
function getMemeDataFromEditor() {
    const meme = {
        imgUrl: gMeme.selectedImg, // Use selectedImg for the image URL
        text: gMeme.lines.map(line => line.txt).join(' '),
        textColor: gMeme.lines.map(line => line.color),
    }

    return meme
}

// Function to show saved memes section
function showSavedMemes() {
    savedMemesSection.style.display = 'block' // Show the saved memes section
}

// Function to hide saved memes section
function hideSavedMemes() {
    savedMemesSection.style.display = 'none' // Hide the saved memes section
}

// Event listener for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault()
        const sectionToShow = this.getAttribute('data-section')
        showSection(sectionToShow)
    })
})

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none'
    })

    // Show the selected section
    const sectionElement = document.querySelector('.saved-memes-section')
    sectionElement.style.display = 'block'

    // If the saved memes section is selected, render the saved memes
    if (section === 'saved-memes') {
        renderSavedMemes()
        showSavedMemes()
    } else {
        hideSavedMemes()
    }
}

function selectImage(imgSrc) {
    gMeme.selectedImg = imgSrc
}



function loadSavedMemes(savedMemes) {
    savedMemesContainer.innerHTML = '' // Clear existing content

    savedMemes.forEach(meme => {
        const elImageContainer = document.createElement('div')
        elImageContainer.classList.add('meme-container') // Add a class for styling

        const elImage = document.createElement('img')
        elImage.src = meme // Assuming meme is the image source
        elImage.alt = 'Saved Meme Image'
        elImage.classList.add('gallery-img')

        elImage.style.width = '100%' // Use full width of the container
        elImage.style.height = 'auto'

        elImage.addEventListener('click', () => {
            selectImage(meme) // Load the selected saved meme
            hideGallery() 
            memeEditor.style.display = 'block' 
            document.querySelector('.saved-memes-section').style.display = 'none' // Hide saved memes section when editor is open
        })

        elImageContainer.appendChild(elImage)
        savedMemesContainer.appendChild(elImageContainer)
    })
}