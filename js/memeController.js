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
        memeCanvas.width = img.width
        memeCanvas.height = img.height

        ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height)

        // Render each line of text
        meme.lines.forEach((line, idx) => {
            ctx.font = `${line.size}px ${line.fontFamily || 'Impact'}`
            ctx.fillStyle = line.color
            ctx.strokeStyle = line.strokeColor
            ctx.textAlign = line.align || 'center'

            let xPos = line.posX || memeCanvas.width / 2
            let yPos = line.posY || line.size

            // Adjust the position based on alignment
            if (line.align === 'left') xPos = 20
            if (line.align === 'right') xPos = memeCanvas.width - 20

            // Draw background rectangle if this is the selected line
            if (idx === meme.selectedLineIdx) {
                const textWidth = ctx.measureText(line.txt).width
                const padding = 10
                const rectX = xPos - (textWidth / 2) - padding
                const rectY = yPos - line.size
                const rectWidth = textWidth + padding * 2
                const rectHeight = line.size + padding

                ctx.fillStyle = 'rgba(200, 200, 200, 0.8)'
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight)
                ctx.fillStyle = line.color
            } else {
                ctx.fillStyle = line.color
            }

            ctx.lineWidth = 2
            ctx.strokeText(line.txt, xPos, yPos)
            ctx.fillText(line.txt, xPos, yPos)
        })

        // Render stickers
        addSticker()

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
    renderMeme()
});

// Text Alignment: Left
alignLeftBtn.addEventListener('click', () => {
    setTextAlign('left')
    renderMeme()
});

// Text Alignment: Center
alignCenterBtn.addEventListener('click', () => {
    setTextAlign('center')
    renderMeme()
});

// Text Alignment: Right
alignRightBtn.addEventListener('click', () => {
    setTextAlign('right')
    renderMeme()
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



// //////////////////////////////////////////////////////////////




let isDragging = false
let startX = 0
let startY = 0

// Mouse events
memeCanvas.addEventListener('mousedown', onMouseDown)
memeCanvas.addEventListener('mousemove', onMouseMove)
memeCanvas.addEventListener('mouseup', onMouseUp)

// Touch events
memeCanvas.addEventListener('touchstart', onTouchStart)
memeCanvas.addEventListener('touchmove', onTouchMove)
memeCanvas.addEventListener('touchend', onTouchEnd)

// Handle mouse down event to start dragging
function onMouseDown(event) {
    const { offsetX, offsetY } = event
    const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        isDragging = true
        startX = offsetX
        startY = offsetY
    }
}

// Handle mouse move event for dragging
function onMouseMove(event) {
    if (!isDragging) return

    const { offsetX, offsetY } = event
    const dx = offsetX - startX
    const dy = offsetY - startY

    moveSelectedLine(dx, dy)
    startX = offsetX
    startY = offsetY
    renderMeme()  // Update the canvas with the new position
}

// Handle mouse up event to stop dragging
function onMouseUp() {
    isDragging = false
}

// Touch events for mobile support
function onTouchStart(event) {
    event.preventDefault()
    event.stopPropagation()
    const touch = event.touches[0]
    const rect = memeCanvas.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top

    const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        isDragging = true
        startX = offsetX
        startY = offsetY
    }
}

function onTouchMove(event) {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) return
    const touch = event.touches[0]
    const rect = memeCanvas.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top

    const dx = offsetX - startX
    const dy = offsetY - startY

    moveSelectedLine(dx, dy)
    startX = offsetX
    startY = offsetY
    renderMeme()
}

function onTouchEnd() {
    isDragging = false
}



// Function to handle canvas click event and select the clicked line
function onCanvasClick(event) {
    const rect = memeCanvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top


    const clickedLineIdx = getClickedLineIdx(x, y)


    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        updateTextInput()
        renderMeme()
    }
}

memeCanvas.addEventListener('click', (event) => {
    const rect = memeCanvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    console.log(`Clicked coordinates: (${x}, ${y})`)

    const clickedLineIdx = getClickedLineIdx(x, y)
    console.log(`Clicked line index: ${clickedLineIdx}`)

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        updateTextInput()
        renderMeme()
    }
})


// /////////////////////////////////////////////////////////////////////////////////


// Sticker Roster //


const stickersOnCanvas = []

const stickers = [
    'img/stickers/CookieMonster.png',
    'img/stickers/Panda-Sticker.png',
    'img/stickers/smilly.png',
    'img/stickers/Unicorn-ProductImage.png',
]

let currentStickerIndex = 0

const currentStickerImg = document.getElementById('current-sticker')
const prevArrow = document.querySelector('.prev-arrow')
const nextArrow = document.querySelector('.next-arrow')


function updateSticker() {
    currentStickerImg.src = stickers[currentStickerIndex]
}

prevArrow.addEventListener('click', () => {
    currentStickerIndex = (currentStickerIndex > 0) ? currentStickerIndex - 1 : stickers.length - 1
    updateSticker()

})

nextArrow.addEventListener('click', () => {
    currentStickerIndex = (currentStickerIndex < stickers.length - 1) ? currentStickerIndex + 1 : 0
    updateSticker()

})

currentStickerImg.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.src)
})

memeCanvas.addEventListener('dragover', (event) => {
    event.preventDefault()
})

memeCanvas.addEventListener('drop', (event) => {
    event.preventDefault()
    const imgSrc = event.dataTransfer.getData('text/plain')
    const x = event.offsetX
    const y = event.offsetY
    addSticker(imgSrc, x, y)

})

function addSticker(imgSrc, x, y) {
    const sticker = new Image()
    sticker.src = imgSrc
    sticker.onload = () => {
        ctx.drawImage(sticker, x, y, 100, 100)
    }

}
updateSticker()



