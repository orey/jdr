/**********************************************
 * Engine for Propp
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: November 2021 
 ***********************************************/
'use strict';

"use strict";

const SEP = "$";

let dice = undefined;

/*
 * Do I really need require.js?
 * Up to now, no, and this code runs both in the browser and in node
 */

if (typeof require !== 'undefined') {
    dice = require("../ScenarioGenerator/dice");
}
else
{
    //define wrappers for web environment
    dice = {
        roll : roll,
        chooseInList : chooseInList,
    };
}

/*****************************************/
// Global variables
let THE_HERO="";
let THE_FAMILY="";

/*****************************************/
const HERO = [
    "the princess",
    "the prince",
    "the soldier",
    "the youngest child of a poor family",
    "the merchant",
];

const FAMILY = [
    "the brother(s) and/or sister(s)",
    "the parents",
    "the husband/wife",
    "relatives",
    "stangers",
];

// Beta
const Absentation = [
    // beta 1
    "$FAMILY$ leave for work.",
    "$FAMILY$ go to the forest",
    "$FAMILY$ leave for business",
    "$FAMILY$ go on a distant journey",
    "$FAMILY$ go away to foreign lands",
    "$FAMILY$ go to war",
    // beta 2
    "$FAMILY$ is dead",
    //beta 3
    "$HERO$ goes visiting",
    "$HERO$ goes fishing",
    "$HERO$ goes for a walk",
    "$HERO$ goes out to gather berries",
];

// Gamma
const Interdiction = [
    // gamma 1
    "You dare not look into this closet",
    "Take care of your little brother",
    "Do not venture forth from the courtyard",
    "If Baba Jaga comes, don't you say anything, be silent",
    "Do not leave the lofty tower",
    "Don't pick the apples",
    "Don't pick up the golden feather",
    "Don't open the chest",
    "Don't kiss your sister",
    // gamma 2
    "Bring breakfast out into the field",
    "Take your brother with you to the woods",
];

//delta
const Violation = [
    
];



/*****************************************/
function parseString(s) {
    let temp = s.split(SEP);
    let output = "";
    for (let i=0;i<temp.length;i++) {
        let zemp = temp[i];
        switch(zemp) {
        case "HERO":
            output += THE_HERO;
            break;
        case "FAMILY":
            output += THE_FAMILY;
            break;
        default:
            output += zemp;
        }
    }
    return output;
}

function solve(section) {
    let a = dice.chooseInList(section);
    if (a.includes(SEP))
        return parseString(a);
    return a;
}


function test() {
    // alpha : Naming the persons of the family presenting the hero
    THE_HERO = solve(HERO);
    console.log("The hero is " + THE_HERO  + ".");
    THE_FAMILY = solve(FAMILY);
    console.log("The family is "+ THE_FAMILY + " of " + THE_HERO + ".");

    //beta
    console.log(solve(Absentation));
    //gamma
    console.log(solve(Interdiction));
    
}

test()

/*****************************************/

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        test,
    }
}


