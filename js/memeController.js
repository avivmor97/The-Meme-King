'use strict';
//const list :
const memeCanvas = document.querySelector('.meme-canvas')
const ctx = memeCanvas.getContext('2d')
const memeTextInput = document.querySelector('.meme-text')
const colorPicker = document.querySelector('.text-color-picker')

// Function to render the meme
function renderMeme() {
    const meme = getMeme() 
  
    if (!meme.selectedImg) return 
    // Create new Image object for the selected image
    const img = new Image()
    img.src = meme.selectedImg

    // Draw the image and text on the canvas once the image is loaded
    img.onload = () => {
        memeCanvas.width = img.width
        memeCanvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Draw text on top
        meme.lines.forEach(line => {
            ctx.font = `${line.size}px Arial`
            ctx.fillStyle = line.color
            ctx.textAlign = 'center'
            ctx.fillText(line.txt, memeCanvas.width / 2, 50) // Position text at the top
        })
    }
}

// Image selection func
function selectImage(imgSrc) {
    setSelectedImg(imgSrc) // Update the image in memeService
    renderMeme() 
}

// Text input
memeTextInput.addEventListener('input', (event) => {
    setLineTxt(event.target.value) // Update meme text in memeService
    renderMeme() 
})

// color picker
colorPicker.addEventListener('input', (event) => {
    setMemeTextColor(event.target.value) // Update text color in memeService
    renderMeme() 
})
