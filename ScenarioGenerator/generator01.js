/**********************************************
 * Scenario generator
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: November 2021
 * Inspired by http://loukoum.online.fr/jdr/adj/gianni1.htm
 ***********************************************/
"use strict";

let dice = undefined;
let lists = undefined;

/*
 * Do I really need require.js?
 * Up to now, no, and this code runs both in the browser and in node
 */

if (typeof require !== 'undefined') {
    dice = require("./dice");
    lists = require("./lists");
}
else
{
    //define wrappers for web environment
    dice = {
        roll : roll,
    };
    list = {
        Sponsor : Sponsor,
    };
}


/*****************************************/

function test() {
    //dice.roll("12D6", true);
    //console.log(dice.chooseInDicedList(lists.SponsorDice));
    console.log(dice.chooseInList(lists.Sponsor));
    console.log("The PCs must " + dice.chooseInList(lists.Destination));
    
}

test()

/*****************************************/

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        test,
    }
}



