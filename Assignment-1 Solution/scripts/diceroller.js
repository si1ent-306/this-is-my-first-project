"use strict";

/*
 Filename:    diceroller.js
 Student:     Mark Key (cstKEY)
 Course:      CWEB 190 (Internet Programming/Web Applications 1)
 Date:        Winter 2024
 Purpose:     Assignment #1 Sample Solution
*/

// CONSTANTS
// header for frequency table
const STATS_TABLE_HEADER = "<thead><tr><th>Roll</th><th>Frequency</th><th>Percent of Total Rolls</th></tr></thead>";

// number of sides of each die being rolled
const DIE_SIDES = 6;

// maximum number of previous rolls stored and displayed
const MAX_PREVIOUS_ROLLS = 10;

// delay in ms between each tumble of the dice for animating each roll
const TUMBLE_DELAY = 100;

// number of times each die tumbles for a single roll of the dice
const NUM_TUMBLES = 10;


// GLOBAL VARIABLES
// array of roll frequencies storing how many times each total was rolled
let arFrequency = [];

// array of previous roll values stored for display
let arPreviousRolls = [];

// total number of rolls of the dice made during this session
let totalRolls = 0;

// number of times the die has tumbled during the roll animation
let tumbleCount = 0;


// GLOBAL CODE
// make initial table and allow rolling of dice
createDice();
makeTable();
enableRolling();


/*
    Function:   createDice
    Parameters: none
    Returns:    nothing
    Purpose:    create the images for the number of dice with the appropriate ids
 */
function createDice() {
    for (let i = 1; i <= numDice; i++) {
        document.getElementById("diceArea").innerHTML +=
            '<img src="images/dice6.png" alt="Image of die" id="image' + i + '" /> ';
    }
}


/*
    Function:   makeTable
    Parameters: none
    Returns:    nothing
    Purpose:    create the initial table for displaying the frequencies of the rolls made
                and set initial value of 0 for each roll frequency
 */
function makeTable() {
    let strStatsTable = STATS_TABLE_HEADER + "<tbody>";
    let i;

    for (i = numDice; i <= numDice * DIE_SIDES; i++) {
        strStatsTable += "<tr><td>" + i + "</td><td>0</td><td>0.000%</td></tr>";
        arFrequency[i] = 0;
    }
    document.getElementById("tblStats").innerHTML = strStatsTable + "</tbody>";
}


/*
    Function:   randomDie
    Parameters: none
    Returns:    a random integer between 1 and DIE_SIDES
    Purpose:    generate a random number for a die with DIE_SIDES sides
 */
function randomDie() {
    return Math.floor(1 + DIE_SIDES * Math.random());
}


/*
    Function:   rollDice
    Parameters: none
    Returns:    nothing
    Purpose:    generates a single roll of the dice by tumbling the dice until the maximum number of tumbles is reached,
                and then processing the resulting total of the dice
 */
function rollDice() {
    let dieValue, dieTotal, i;

    dieTotal = 0;
    for (i = 1; i <= numDice; i++) {
        dieValue = randomDie();
        dieTotal += dieValue;
        document.getElementById("image" + i).src = "images/dice" + dieValue + ".png";
    }

    tumbleCount++;
    if (tumbleCount < NUM_TUMBLES) {
        setTimeout(rollDice, TUMBLE_DELAY); // set up another tumble after TUMBLE_DELAY ms
    }
    else {
        tumbleCount = 0;
        processRoll(dieTotal);
    }
}


/*
    Function:   processRoll
    Parameters: diceTotal - total value on all dice rolled
    Returns:    nothing
    Purpose:    updates the list of the most recent rolls and the frequencies of the rolls in the session
                and enables future rolls
 */
function processRoll(diceTotal) {
    document.getElementById("pRolled").innerHTML = "<strong>You rolled " + diceTotal + "...</strong>";
    updatePreviousRolls(diceTotal);
    updateFrequencies(diceTotal);

    enableRolling();
}


/*
    Function:   updatePreviousRolls
    Parameters: diceTotal - total value on all dice rolled for the current roll
    Returns:    nothing
    Purpose:    update the array of previous rolls based on the most recent roll and display the results
 */
function updatePreviousRolls(diceTotal) {
    let arrayLength, strLastTen, i;

    arPreviousRolls.push(diceTotal);
    arrayLength = arPreviousRolls.length;
    if (arrayLength > MAX_PREVIOUS_ROLLS) {
        arPreviousRolls.shift();
        arrayLength--;
    }
    strLastTen = "The previous " + arrayLength + " rolls were: ";
    for (i = 0; i < arrayLength; i++) {
        strLastTen += arPreviousRolls[i] + ", ";
    }
    strLastTen = strLastTen.slice(0, strLastTen.length - 2);
    document.getElementById("pPreviousTenRolls").innerHTML = strLastTen;
}


/*
    Function:   updateFrequencies
    Parameters: diceTotal - total value on all dice rolled for the current roll
    Returns:    nothing
    Purpose:    updates the frequency of the rolls and displays the updated frequency table
 */
function updateFrequencies(diceTotal) {
    let strStatsTable, i;

    arFrequency[diceTotal]++;
    totalRolls++;
    document.getElementById("pTotalRolls").innerHTML = "My statistics for a total of " + totalRolls + " rolls:";
    strStatsTable = STATS_TABLE_HEADER + "<tbody>";
    for (i = numDice; i <= numDice * DIE_SIDES; i++) {
        strStatsTable += "<tr><td>" + i + "</td><td>" + arFrequency[i] + "</td><td>"
            + (arFrequency[i] / totalRolls * 100).toFixed(3) + "%</td></tr>";
    }
    document.getElementById("tblStats").innerHTML = strStatsTable + "</tbody>";
}


/*
    Function:   rollOnce
    Parameters: none
    Returns:    nothing
    Purpose:    roll the dice once
 */
function rollOnce() {
    disableRolling();
    rollDice();
}


/*
    Function:   disableRolling
    Parameters: none
    Returns:    nothing
    Purpose:    prevent the dice from being rolled by any method
 */
function disableRolling() {
    document.getElementById("btnRoll").disabled = true;
    document.getElementById("btnRoll").onclick = null;
}


/*
    Function:   enableRolling
    Parameters: none
    Returns:    nothing
    Purpose:    allow the dice to be rolled by clicking on btnRoll
 */
function enableRolling() {
    document.getElementById("btnRoll").disabled = false;
    document.getElementById("btnRoll").onclick = rollOnce;
}
