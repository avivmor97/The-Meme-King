'use strict'
//const list:
const memeCanvas = document.querySelector('.meme-canvas')
const ctx = memeCanvas.getContext('2d')
const memeTextInput = document.querySelector('.meme-text')
const colorPicker = document.querySelector('.text-color-picker')
const increaseFontBtn = document.querySelector('.increase-font-btn')
const decreaseFontBtn = document.querySelector('.decrease-font-btn')
const downloadBtn = document.querySelector('.download-btn')
const addLineBtn = document.querySelector('.add-line-btn')
const deleteLineBtn = document.querySelector('.delete-line-btn')
const switchLineBtn = document.querySelector('.switch-line-btn')
const fontFamilySelector = document.querySelector('.font-family-selector')
const alignLeftBtn = document.querySelector('.align-left-btn')
const alignCenterBtn = document.querySelector('.align-center-btn')
const alignRightBtn = document.querySelector('.align-right-btn')
const moveUpBtn = document.querySelector('.move-up-btn')
const moveDownBtn = document.querySelector('.move-down-btn')
const mobileBtn = document.querySelector('.moblie-btn')
const navLinks2 = document.querySelector('.nav-links')




// Function to render the meme
function renderMeme() {
    const meme = getMeme()

    if (!meme.selectedImg) return

    const img = new Image()
    img.src = meme.selectedImg

    img.onload = () => {
        // Set the canvas width to 100% and adjust height to maintain aspect ratio
        memeCanvas.width = img.width
        memeCanvas.height = img.height
        
        // Calculate aspect ratio
        const aspectRatio = img.width / img.height
        const newCanvasWidth = memeCanvas.width
        const newCanvasHeight = newCanvasWidth / aspectRatio

        // Resize the canvas to the new dimensions
        memeCanvas.width = newCanvasWidth
        memeCanvas.height = newCanvasHeight

        // Draw the image to fill the canvas
        ctx.drawImage(img, 0, 0, newCanvasWidth, newCanvasHeight)

        meme.lines.forEach((line, idx) => {
            // Apply font family, size, and alignment
            ctx.font = `${line.size}px ${line.fontFamily || 'Impact'}` // Use Impact as default
            ctx.fillStyle = line.color
            ctx.strokeStyle = line.strokeColor // Set stroke color
            ctx.textAlign = line.align || 'center'

            // Set the line position based on the alignment
            let xPos = memeCanvas.width / 2
            if (line.align === 'left') xPos = 20
            if (line.align === 'right') xPos = memeCanvas.width - 20

            // Draw background rectangle if this is the selected line
            if (idx === meme.selectedLineIdx) {
                const textWidth = ctx.measureText(line.txt).width
                const padding = 10
                const rectX = xPos - (textWidth / 2) - padding
                const rectY = line.posY - line.size
                const rectWidth = textWidth + padding * 2
                const rectHeight = line.size + padding

                // Draw semi-transparent rectangle
                ctx.fillStyle = 'rgba(200, 200, 200, 0.8)' // Adjust color and opacity
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight)
            }

            // Draw the text stroke first
            ctx.lineWidth = 2 // Set stroke width
            ctx.strokeText(line.txt, xPos, line.posY)

            // Draw the filled text on top
            ctx.fillText(line.txt, xPos, line.posY)
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
    setLineTxt(event.target.value, gMeme.selectedLineIdx) // Update the selected line text
    renderMeme()
})

// color picker
colorPicker.addEventListener('input', (event) => {
    setMemeTextColor(event.target.value) // Update text color in memeService
    renderMeme()
})
// Update font family
fontFamilySelector.addEventListener('change', (event) => {
    setFontFamily(event.target.value);
    renderMeme();
});

// Text Alignment: Left
alignLeftBtn.addEventListener('click', () => {
    setTextAlign('left');
    renderMeme();
});

// Text Alignment: Center
alignCenterBtn.addEventListener('click', () => {
    setTextAlign('center');
    renderMeme();
});

// Text Alignment: Right
alignRightBtn.addEventListener('click', () => {
    setTextAlign('right');
    renderMeme();
});

// Update meme service functions to handle font family and alignment

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily;
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

// Add new line
addLineBtn.addEventListener('click', addLine)

// Add delete the selected line
deleteLineBtn.addEventListener('click', deleteLine)


// Switch line
switchLineBtn.addEventListener('click', switchLine)

// Increase font size
increaseFontBtn.addEventListener('click', increaseFont)

// Decrease font size
decreaseFontBtn.addEventListener('click', decreaseFont)

// Download meme
downloadBtn.addEventListener('click', downloadMeme)

// Move up line
moveUpBtn.addEventListener('click', moveLineUp)

// Move down line
moveDownBtn.addEventListener('click', moveLineDown)

mobileBtn.addEventListener('click', () => {
    navLinks2.classList.toggle('active') // Toggles the active class for visibility
})

memeCanvas.addEventListener('click', (event) => {
    const { offsetX, offsetY } = event;
    const clickedLineIdx = getClickedLineIdx(offsetX, offsetY);
    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx;
        updateTextInput(); 
        renderMeme(); 
    }
});

