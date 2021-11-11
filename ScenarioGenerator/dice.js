/**********************************************
 * Dice.js : from ory/oracles/rpg/oracles-engine.js
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: October 2020 
 ***********************************************/
// TODO Make a reusable module
"use strict";

//const math = require('mathjs');

/*-----------------------------------
Main random function
 ------------------------------------*/
function rollDie(faces){
    return Math.floor((Math.random()*faces)+1);
}

function rollDie2(faces) {
    let interval = 1 / faces;
    let rand = Math.random(); // Cannot be 1
    let choice = 0;
    for (let i=0; i<faces; i++) {
        if ((rand >= i/faces) && (rand < (i+1)/faces)) {
            choice = i+1;
            break;
        }
    }
    return choice;

}

/*-----------------------------------
Test functions to see if probabilities are good
------------------------------------*/
var MAX = 1000000;

// f a function
function testRollDie(faces, f){
    let arr = Array(faces).fill(0);
    console.log("Testing probabilities of %s on %s rolls",
                faces.toString(),
                MAX.toString())
    var sum = 0, roll = 0;
    for (var i=0;i<MAX;i++){
        roll = f(faces)
        sum += roll;
        arr[roll -1] += 1;
    }
    return [sum/MAX, arr];
}

function printArray(arr) {
    for (let i=0;i<arr.length;i++)
        process.stdout.write(parseFloat(arr[i]/MAX*100).toFixed(2)+"|")
    console.log("\n");
    //goes with the import of mathjs
    //console.log("Standard deviation: " + parseFloat(math.std(arr)).toFixed(2));
}

function testAll(){
    let samples = [4, 6, 8, 10, 12, 20, 30, 100, 3, 7, 9, 13, 39];
    for (let i=0;i<samples.length;i++) {
        console.log("Testing RollDie (in percents)");
        let t = testRollDie(samples[i], rollDie);
        console.log("D" + samples[i].toString() + ":" + t[0].toString());
        printArray(t[1]);
        console.log("Testing RollDie2 (in percents)");
        let t2 = testRollDie(samples[i], rollDie2);
        console.log("D" + samples[i].toString() + ":" + t2[0].toString());
        printArray(t2[1]);
        console.log("-------------------");
    }
}

/*------------------------------------
Combination can be 3D6+2, 1D20, 3D8+1 as a string
Just one die should be 1D6
 ------------------------------------*/
function roll(combi, verbose=false){
    if (!(typeof combi == "string")) {
        console.error("Combination is not a string. Exiting.")
        return 0;
    }
    //determine pips
    let res = combi.split("+");
    let what = res[0].split("D");
    //rolling dice
    let acc = [];
    for (var i = 0; i < what[0]; i++) {
        acc.push(rollDie(what[1]));
    }
    //adding pips
    let pips  = parseInt(res.length == 2 ? res[1] : "0");
    let total = acc.reduce((a,b) => a+b, 0) + pips;
    if (verbose)
        console.info("> Launching %s. Dices: %s, pips: %s. Total: %s",
                     combi,
                     JSON.stringify(acc),
                     pips.toString(),
                     total.toString());
    return total;
}

function testCombi(){
    roll("3D6", true);
    roll("12D10", true);
    roll("3D4+2", true);
    roll("1D30+6", true);
    roll("4D8+3", true);
    roll("1D4", true);
    roll("1D8+3", true);
    roll("1D20+2", true);
    roll("3D8", true);
}

/*------------------------------------
Choose in list with patterns
 ------------------------------------*/
function chooseInDicedList(l) {
    return l.values[roll(l.pattern)-1];
}


const testList = { pattern: "1D10",
                   values:  [
                       "Value 01",
                       "Value 02",
                       "Value 03",
                       "Value 04",
                       "Value 05",
                       "Value 06",
                       "Value 07",
                       "Value 08",
                       "Value 09",
                       "Value 10",
                   ]
                 };

function testDaDicedList() {
    for (let i=0;i<30;i++)
        console.log(chooseInDicedList(testList));
}

/*****************************************/

/*-----------------------------------
Choose in list
 ------------------------------------*/
function chooseInList(l){
    let size = l.length;
    let res = l[Math.floor(Math.random()*size)];
    if (Array.isArray(res))
        return chooseInList(res);
    return res;
}

/*****************************************/

function test() {
    console.log("Dice.js - Start tests");
    console.log("------------------");
    testAll();
    console.log("------------------");
    testCombi();
    console.log("------------------");
    testDaDicedList();
    console.log("------------------");
    console.log("Dice.js - End tests");
}
                           
/*****************************************/

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        rollDie,
        rollDie2,
	roll,
        chooseInDicedList,
        chooseInList,
        test,
    }
}

