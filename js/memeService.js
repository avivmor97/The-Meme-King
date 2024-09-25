'use strict';

let gMeme = {
    selectedImg: null,
    lines: [
        {
            txt: 'Enter Text', // Default text
            size: 40,
            color: '#000000'
        }
    ]
}

// Function to return the current meme object
function getMeme() {
    return gMeme
}

// Function to update the selected image
function setSelectedImg(imgSrc) {
    gMeme.selectedImg = imgSrc
}

// Function to update the meme text
function setLineTxt(text) {
    gMeme.lines[0].txt = text
}

// Function to update the text color
function setMemeTextColor(color) {
    gMeme.lines[0].color = color
}
