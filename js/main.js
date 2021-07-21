/** 
 * main.js 
 * This file contains code that runs on load for index.html
 */


"use strict";

// The function 'displayLockers' generates HTML code for each individual locker
// Input(s): data (a class)
// Output(s): none 
function displayLockers(data) {
    let output = "";
    for (let i = 0; i < data.count; i++) {
        // Using the brightness(hex) function to generate a text colour depending on the brightness of the background colour
        // textColour is used to colour all elements on the locker card
        let textColour = brightness(data.lockers[i].color); 
        
        // Setting up an MDL card for the locker display
        output += '<div class="mdl-cell mdl-cell--4-col">';
        output += '<div class="mdl-card mdl-shadow--2dp locker" style="background-color:#' + data.lockers[i].color + '">';
        output += '<div class="mdl-card__title mdl-card--expand">';
        
        // Placing the delete button on the top right corner
        output += '<div class="mdl-card__menu">';
        output += '<button class="mdl-button mdl-js-button mdl-button--fab" style="color:' + textColour + '" onclick="removeLockerFromIndex(' + i + ')">';
        output += '<i class="material-icons">delete</i></button></div>';
        
        // Labelling the locker with its id and label
        output += '<h2 style="color:' + textColour + '";>' + data.lockers[i].id + '</h2>';
        output += '<h4 style="color:' + textColour + '";>&nbsp;' + data.lockers[i].label + '</h4></div>';

        // A border to section off the bottom of the locker card display 
        output += '<div class="mdl-card__actions mdl-card--border">';

        // The 'Open Locker' button that takes the user to view.html to view the contents of the locker
        output += '<a style="color:' + textColour + '" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="view(' + i + ')">Open Locker</a>';
        output += '<div class="mdl-layout-spacer"></div>';

        // A symbol of a lock showing if the locker is locked or not
        output += '<i style="color:' + textColour + '" class="material-icons">';
        if (data.lockers[i]._locked == true) {
            output += 'lock'; // if the locker is locked, the symbol is one of a locked lock
        }
        else {
            output += 'lock_open'; // if the locker is not locked, the symbole is one of an open lock
        }
        output += '</i></div></div></div>';
    }
    // Sending 'output' to id "lockerDisplay" in the HTML file index.html 
    document.getElementById("lockerDisplay").innerHTML = output;
}


// The function 'addNewLocker' adds a new locker to the 'lockers' array 
// Input(s): none 
// Output(s): none
function addNewLocker() {
    if (lockers.count === 0) {
        lockers.addLocker("A001");
        updateLocalStorage(lockers);
    }
    else {            
        // Retrieving the previous locker ID and number 
        let lastId = lockers.getLocker(lockers.count - 1).id;
        let previousLockerNumber = parseInt(lastId.substring(lastId.length - 3)); 
        
        let lockerNum = previousLockerNumber + 1; // the next locker's ID is one more than the current length
        
        // Generating a string for the locker ID depending on the length of the locker number
        if (lockerNum.toString().length == 1) {
            let lockerIdStr = `A00${lockerNum}`; // If one digit, the locker id starts with 'A00'
            lockers.addLocker(lockerIdStr); // Adding a new locker to 'lockers' 
            updateLocalStorage(lockers); // Updating local storage
        }
        else if (lockerNum.toString().length == 2) {
            let lockerIdStr = `A0${lockerNum}`; // If two digits, the locker id starts with 'A0'
            lockers.addLocker(lockerIdStr); // Adding a new locker to 'lockers' 
            updateLocalStorage(lockers); // Updating local storage
        }
        else if (lockerNum.toString().length == 3) {
            let lockerIdStr = `A${lockerNum}`; // If three digits, the locker id starts with 'A'
            lockers.addLocker(lockerIdStr); // Adding a new locker to 'lockers' 
            updateLocalStorage(lockers); // Updating local storage
        }
        else { // If there are more than three digits
            alert("Too many lockers!") // Alerting the user that there are too many lockers
        }
    }
    // Updating display of lockers
    displayLockers(lockers);
}

// The function 'view' stores the index of the locker opened so that its contents can be retrieved in view.html
// Input(s): index (the index of the locker)
// Output(s): none
function view(index) {
    // Setting the index into localStorage by stringifying it, and setting it to the key 'LOCKER_INDEX_KEY'
    localStorage.setItem(LOCKER_INDEX_KEY, JSON.stringify(index));
    window.location = "view.html"; // Redirects the user to view.html
}

// The function 'removeLockerFromIndex' deletes a locker from index.html page
// Input(s): index (the index of the locker)
// Outputs: none
function removeLockerFromIndex(index){
    lockers.removeLocker(lockers.getLocker(index).id); // Getting the locker id from its index, and removing it from the lockers array
    updateLocalStorage(lockers); // Updating local storage
    displayLockers(lockers); // Refreshing the display of lockers to show the available lockers
}

// The function 'brightness' determines whether the background requires white or black text to be legible
// Input(s): hex (a string containing a colour hex code)
// Output(s): the text colour ("white" or "black" in a string)
function brightness(hex){
    // Determining the RGB values of the colour
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    
    // Calculating brightness from the r, b and g values
    let brightness = Math.sqrt(0.299*Math.pow(r,2) + 0.587*Math.pow(g,2) + 0.114*Math.pow(b,2));
    
    if (brightness < 128){ 
        return "white"; // If the brightness is less than 128, "white" is required
    }
    else {
        return "black"; // If the brightness is more than or equal to 128, "black" is returned
    }
}

// Code that runs on load
displayLockers(lockers); // Displaying the lockers as soon as the page loads