'use strict'




const savedMemesSection = document.querySelector('.saved-memes-section') // Replace with the actual section class/ID

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
    const memes = loadFromStorage('savedMemes')

    if (!memes || memes.length === 0) {
        savedMemesSection.innerHTML = '<p>No saved memes yet!</p>'
        return
    }

    savedMemesSection.innerHTML = ''

    memes.forEach(meme => {
        const memeHTML = `
                <img src="${meme.imgUrl}" alt="Saved Meme">
        `
        savedMemesSection.innerHTML += memeHTML
    })
}

// Function to get the canvas image
function getCanvasImage() {
    const canvas = document.querySelector('.meme-canvas') // Select canvas by class name
    if (!canvas) {
        console.error('Canvas not found! Please check the canvas class.')
        return null // Return null if the canvas is not found
    }
    return canvas.toDataURL('image/png') // This gets the image data URL from the canvas
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
    const sectionElement = document.getElementById(section)
    sectionElement.style.display = 'block'

    // If the saved memes section is selected, render the saved memes
    if (section === 'saved-memes') {
        renderSavedMemes()
        showSavedMemes() // Call the function to show the saved memes section
    } else {
        hideSavedMemes() // Hide it when switching sections
    }
}

function selectImage(imgSrc) {
    gMeme.selectedImg = imgSrc // Set the selected image URL
    // Additional logic for displaying the meme editor
}
