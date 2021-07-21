/** 
 * shared.js 
 * This file contains shared code that runs on both view.html and index.html
 */

"use strict";
// Constants used as KEYS for LocalStorage
const LOCKER_INDEX_KEY = "selectedLockerIndex";
const LOCKER_DATA_KEY = "lockerLocalData";

// The Locker class
class Locker {
    constructor(id) {
        this._id = id;
        this._label = "";
        this._locked = false;
        this._pin = "";
        this._color = randomColor();
        this._contents = "";
    }

    // Accessors
    get id() {
        return this._id;
    }
    get label() {
        return this._label;
    }
    get locked() {
        return this._locked;
    }
    get pin() {
        return this._pin;
    }
    get color() {
        return this._color;
    }
    get contents() {
        return this._contents;
    }

    // Mutators
    set label(newLabel) {
        this._label = newLabel;
    }
    set locked(newState) {
        this._locked = newState;
    }
    set pin(newPin) {
        this._pin = newPin;
    }
    set color(newColor) {
        this._color = newColor;
    }
    set contents(newContents) {
        this._contents = newContents;
    }

    // fromData returns all the information of a 'data', a locker
    fromData(data) {
        this._id = data._id;
        this._label = data._label;
        this._locked = data._locked;
        this._pin = data._pin; 
        this._color = data._color;
        this._contents = data._contents;
    }
}

// The LockerList class
class LockerList {
    constructor() {
        this._lockers = [];
    }

    // Accessors
    get lockers() {
        return this._lockers;
    }
    get count() {
        return this._lockers.length; // The number of lockers is the length of the LockerList
    }

    // Methods
    // addLocker adds a new Locker to the LockerList given the new locker id
    addLocker(id) {
        let newLocker = new Locker(id); // The new locker is a new class instance
        this._lockers.push(newLocker); // Pushing the new locker to the LockerList
    }

    // getLocker returns the locker at the specified index 
    getLocker(index) {
        return this._lockers[index];
    }

    // removeLocker removes a locker from the LockerList based on its id
    removeLocker(id) {
        for(let i = 0; i < lockers.count; i++){ // For every locker in the LockerList
            if (lockers.getLocker(i).id == id){ // If its id matches that of provided id
                this._lockers.splice(i, 1); // Remove the locker at the index 'i'
            }
        }
    }

    // fromData restores the lockers from local storage data
    fromData(data) {
        this._lockers = []; // Initialising a blank array for the LockerList
        for (let i = 0; i < data._lockers.length; i++) { // For every locker
            let locker = new Locker(); // Let each locker be a new Locker class instance
            locker.fromData(data._lockers[i]); // Get each locker's information from the data provided
            this._lockers.push(locker); // Pushing the locker to the LockerList
        }
    }
}

// The function 'checkIfDataExistsLocalStorage' checks whether there is data in local storage
// Input(s): none
// Output(s): false or true (boolean)
function checkIfDataExistsLocalStorage() {
    // Getting the data in localStorage using the key 'LOCKER_DATA_KEY'
    let data = localStorage.getItem(LOCKER_DATA_KEY);
    
    // Checking whether data is "undefined", an empty string, or null
    if (typeof data == "undefined" || data == "" || data == null) { 
        return false; // If yes, return false
    }
    else {
        return true; // If no, return true 
    }
}

// The function 'updateLocalStorage' updates the local storage
// Input(s): data
// Output(s): none
function updateLocalStorage(data) {
    // Stringifying the data and then storing it in local storage using the key LOCKER_DATA_KEY
    localStorage.setItem(LOCKER_DATA_KEY, JSON.stringify(data));
}

// The function 'getDataLocalStorage' retrieves data from the localStorage
// Input(s): none
// Output(s): data 
function getDataLocalStorage() {
    // Getting the localStorage data using the key LOCKER_DATA_KEY
    // Then, parsing it back into an object
    return JSON.parse(localStorage.getItem(LOCKER_DATA_KEY));
}

// The function 'randomColor' generates a random colour using a hex code
// Input(s): none
// Output(s): colour (a hex code)
function randomColor(){
    let character = '0123456789ABCDEF'; // All possible characters in the hex code
    let colour = "";
    for (let i = 0; i < 6; i++) { // 6 digits necessary for a complete hex code
      colour += character[Math.floor(Math.random() * 16)]; // Getting a character at random
    }
    return colour;
}

// Global LockerList instance variable
let lockers = new LockerList();

// Code that runs on load
if (checkIfDataExistsLocalStorage() === true){ // If data exists in local storage
    lockers.fromData(getDataLocalStorage()); // Get said data, and add it to 'lockers'
}
else { // If data does not exist
    lockers.addLocker("A001"); // Add a locker "A001" to lockers
    updateLocalStorage(lockers); // Update local storage with lockers
}