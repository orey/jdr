"use strict";

const VERBOSE=true;
//const VERBOSE=false;

let myconsole = {
    log : function(s) {
        if (VERBOSE) console.log(s);
    }
}

function usage() {
    console.log("Usage:");
    console.log("> node proba [number] [faces]");
    console.log("'number' and 'faces' must be integers");
    process.exit(0);
}

let args = process.argv;
if (args.length != 4)
    usage();
myconsole.log(args);

// get params
let number = parseInt(args[2]);
let faces  = parseInt(args[3]);
if (isNaN(number) || isNaN(faces)){
    console.log("You provided parameters that are not numbers");
    usage();
}

myconsole.log(number);
myconsole.log(faces);

// combinb - values starts at "number"
let combinb = [];
// current combi - starts at 0, 
let combi = new Array(number).fill(1);
myconsole.log(combi);

// takes combi as global variable
// index starts at 0
function nextcombi(index){
    let last = combi[index];
    if (last < faces) {
        combi[index] = last + 1;
        return true;
    }
    if (index == 0)
        return false; // we are at the end
    combi[index] = 1;
    return nextcombi(index-1);
}

function takeCombiIntoAccount(){
    let total = combi.reduce(function(a, b){return a+b;});
    if (combinb[total] == undefined)
        combinb[total] = 1;
    else
        combinb[total] = combinb[total] + 1 ;
}

function check(){
    return combinb.reduce(function(a, b){return a+b;}) == Math.pow(faces,number) ? "Validated" : "Error" ;
}

function printCombiNb(){
    let siz = combinb.length;
    let val = 0
    for (let i=0;i<siz;i++){
        val = combinb[i];
        if (val != undefined)
            console.log(i + " : " + val);
    }
}

takeCombiIntoAccount(); // 1,1,...,1 the first
while (nextcombi(number-1)){
    myconsole.log(combi);
    takeCombiIntoAccount()
}
myconsole.log(check());
//myconsole.log(combinb);
console.log("=> " + Math.pow(faces,number).toString() + " combinations");
printCombiNb();

function moreThanOrEqualToTargetNumber(tn){
    if (tn > number*faces)
        return 0;
    let siz = combinb.length;
    let sub = combinb.slice(tn,siz);
    return sub.reduce(function(a, b){return a+b;}) / Math.pow(faces,number);    
}

function percentageMoreThanOrEqualToTargetNumber(format=1){
    let max = number*faces;
    for (let tn=number;tn<=max;tn++){
        if (format !=1)
            console.log("TN = "
                        + tn.toString()
                        + " - "
                        + (moreThanOrEqualToTargetNumber(tn)*100).toFixed(2).toString()
                        + "%");
        else
            console.log(tn.toString()
                        + ","
                        + (moreThanOrEqualToTargetNumber(tn)*100).toFixed(2).toString()
                        + "%");
    }
}

percentageMoreThanOrEqualToTargetNumber();


