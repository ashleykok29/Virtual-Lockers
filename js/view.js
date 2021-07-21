/** 
 * view.js 
 * This file contains code that runs on load for view.html
 */

"use strict";
// The function 'displayLockerInfo' displays the required locker's information on view.html
// Input(s): locker (a Locker class instance)
// Output(s): none
function displayLockerInfo(locker){
    // Sending respective information to the HTML file either using .innerHTML or .value
    // .innerHTML for an unchangeable value, the locker id
    // .value for display inside an input area
    document.getElementById("lockerId").innerHTML = locker.id; 
    document.getElementById("lockerContents").value = locker.contents;
    document.getElementById("lockerLabel").value = locker.label;
    document.getElementById("lockerColor").value = locker.color;
}

// The function 'unlock' unlocks a locker
// Input(s): locker (a Locker class instance)
// Output(s): none
function unlock(locker){
    let userEnterPin = prompt("Enter your pin:"); // A popup prompt box for the user to enter their pin
    if(userEnterPin == locker.pin){ // If the pin is the correct pin
        locker.locked = false; // The locker is set to no longer locked
        locker.pin = ""; // The pin is reverted to an empty string
        updateLocalStorage(lockers); // LocalStorage is updated 
        window.location = "view.html"; // Redirected to the locker's view.html page
        displayLockerInfo(locker); // Displaying locker information
    }
    else{ // If the pin is incorrect
        alert("Wrong pin, please try again."); // Alerting the user that the entered pin is wrong
        window.location = "index.html"; // Directing back to the index page 
    }
}

// The function 'deleteThisLocker' deletes a locker from the locker's view.html page
// Input(s): none 
// Output(s): none
function deleteThisLocker(){
    // Confirm with the user
    if (confirm("Are you very sure?")){
        // runs if user clicks 'OK'
        lockers.removeLocker(locker.id); // removing the locker from the lockers array
        updateLocalStorage(lockers); // updating local storage
        alert("Locker has been deleted."); // Alerting the user
        window.location = "index.html"; // Directing back to the index page
    }
    // The popup box closes and nothing happens if user clicks 'Cancel'
}

// The function 'lockLocker' locks a locker
// Input(s): none 
// Output(s): none
function lockLocker(){
    if(confirm("Lock locker?")){ // Confirming to lock the locker
        let pin = prompt("Enter your pin"); // A prompt asking for a pin 
        let pinConfirm = prompt("Confirm your pin"); // A prompt for the pin confirmation
        if (pin === pinConfirm){ // If both pins match
            // Change attributes of the locker 
            locker.locked = true;
            locker.pin = pin;
            locker.contents = document.getElementById("lockerContents").value;
            locker.color = document.getElementById("lockerColor").value;
            locker.label = document.getElementById("lockerLabel").value;
            
            updateLocalStorage(lockers); // Updating local storage
            window.location = "index.html"; // Directing back to the index page
        }
        else{ // If pins do not match
            alert("Pins do not match, please try again."); // Alerting the user
            window.location = "view.html"; // Directing back to the locker's view page
        }
    }
}

// The function 'closeLocker' closes a locker
// Input(s): none 
// Output(s): none
function closeLocker(){    
    // Updating the locker's attributes
    locker.contents = document.getElementById("lockerContents").value;
    locker.color = document.getElementById("lockerColor").value;
    locker.label = document.getElementById("lockerLabel").value;
    
    updateLocalStorage(lockers); // Updating local storage 
    alert("Locker is closed but not locked."); // Alerting the user
    window.location = "index.html"; // Directing back to the index page
}

// Retrieve the stored index from local storage
let index = localStorage.getItem(LOCKER_INDEX_KEY);
// using the getLocker method, retrieve the current Locker instance
let locker = lockers.getLocker(index);

// Code that runs on load
if (locker.locked == true){ // If the locker is locked
    unlock(locker); // Go unlock the locker using the function 'unlock'
}
else { // If the locker is not locked
    displayLockerInfo(locker); // Display the locker information
}

