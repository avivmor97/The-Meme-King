'use strict';

let gMeme = {
    selectedImg: null, 
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter first line',
            size: 40,
            color: 'white',
            strokeColor: 'black', 
            posX: 250, 
            posY: 50,
            fontFamily: 'Impact' 
        },
        {
            txt: 'Enter second line',
            size: 40,
            color: 'white',
            strokeColor: 'black', 
            posX: 250,
            posY: 450,
            fontFamily: 'Impact' 
        }
    ]
}


// Function to return the current meme object
function getMeme() {
    return gMeme
}


// Function to get the currently selected line
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// Function to update the text input when switching lines
function updateTextInput() {
    const selectedLine = getSelectedLine()
    memeTextInput.value = selectedLine.txt
}
// Function to switch to the next line
function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    updateTextInput()
    renderMeme() // Re-render the meme after switching lines
}


// Function to update the selected image
function setSelectedImg(imgSrc) {
    gMeme.selectedImg = imgSrc
}

// Function to update the meme text
function setLineTxt(text, lineIdx) {
    gMeme.lines[lineIdx].txt = text
}

// Function to update the text color
function setMemeTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color // Apply color to the selected line
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily;
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function increaseFont() {
    const selectedLine = getSelectedLine()
    selectedLine.size += 2
    renderMeme()
}

function decreaseFont() {
    const selectedLine = getSelectedLine()
    if (selectedLine.size > 10) {
        selectedLine.size -= 2
        renderMeme()
    }
}


function downloadMeme() {
    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = memeCanvas.toDataURL()
    link.click()
}

function addLine() {
    const newYPos = 100 + gMeme.lines.length * 50 
    const newLine = {
        txt: `Enter text for extra line `,
        size: 40,
        color: 'white',
        strokeColor: 'black', 
        posX: memeCanvas.width / 2, 
        posY: newYPos,
        fontFamily: 'Impact'
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1 
    updateTextInput() 
    renderMeme() 
}


function deleteLine() {
    if (gMeme.lines.length > 1) { 
        gMeme.lines.splice(gMeme.selectedLineIdx, 1) 
        gMeme.selectedLineIdx = Math.max(gMeme.selectedLineIdx - 1, 0) 
        renderMeme()
        updateTextInput() 
    }
}

function openShareModal() {
    document.getElementById("shareModal").style.display = "block"
}


function closeShareModal() {
    document.getElementById("shareModal").style.display = "none"
}

function moveLineUp() {
    const selectedLine = getSelectedLine()
    selectedLine.posY -= 10 
    renderMeme()
}


function moveLineDown() {
    const selectedLine = getSelectedLine()
    selectedLine.posY += 10 
    renderMeme()
}



function shareOnFacebook() {
    // Convert the canvas to a data URL
    const memeDataUrl = memeCanvas.toDataURL('image/png');

    // Create a temporary image element
    const img = new Image();
    img.src = memeDataUrl;

    img.onload = function() {
        // Open the Facebook share dialog
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeDataUrl)}`;
        window.open(fbShareUrl, '_blank');
    };
}


// //////////////////////////////////////////////////////////////////////////////


function moveSelectedLine(dx, dy) {
    const selectedLine = getSelectedLine()
    selectedLine.posX += dx
    selectedLine.posY += dy
}

// Get the currently selected line
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// Function to check if a line was clicked
function getClickedLineIdx(x, y) {
    return gMeme.lines.findIndex(line => {
        const textWidth = ctx.measureText(line.txt).width
        const textHeight = line.size // This can be adjusted for more accuracy

        return (
            x >= line.posX - textWidth / 2 && x <= line.posX + textWidth / 2 &&
            y >= line.posY - textHeight && y <= line.posY // Adjust if you want to allow clicks slightly below
        )
    })
}

