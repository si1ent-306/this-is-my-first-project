"use strict";

/*
 Filename:    numdice.js
 Student:     Mark Key (cstKEY)
 Course:      CWEB 190 (Internet Programming/Web Applications 1)
 Date:        Winter 2024
 Purpose:     Assignment #1 Sample Solution
*/

// CONSTANTS
// prompt for number of dice
const MESSAGE1 = "How many dice should be rolled? (1-5)";

// message if the user entered an incorrect number of dice
const MESSAGE2 = "Number of dice must be an integer between 1 and 5";


// GLOBAL VARIABLES
// number of dice being rolled - NOTE: used in diceroller.js as well
let numDice;

// check if the user has chosen a valid number of dice
let keepGoing = true;

// message for prompt
let message = MESSAGE1;

// GLOBAL CODE
do {
    numDice = window.prompt(message, "");
    switch (numDice) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
            numDice = parseInt(numDice);
            keepGoing = false;
            break;
        case null:
            window.alert("Using a default of 2 dice");
            numDice = 2;
            keepGoing = false;
            break;
        default:
            message = MESSAGE2 + "\n" + MESSAGE1;
            break;
    }
} while(keepGoing);
