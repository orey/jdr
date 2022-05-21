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
    console.log("> node proba [number1] [faces1] [number2] [faces2]");
    console.log("'number' and 'faces' must be integers");
    process.exit(0);
}

let args = process.argv;
if (args.length != 6)
    usage();
myconsole.log(args);

// get params
let number1 = parseInt(args[2]);
let faces1  = parseInt(args[3]);
let number2 = parseInt(args[4]);
let faces2  = parseInt(args[5]);
if (isNaN(number1) || isNaN(faces1) || isNaN(number2) || isNaN(faces2)){
    console.log("You provided parameters that are not numbers");
    usage();
}

myconsole.log(  number1.toString() + " - " + faces1.toString() + " - "
              + number2.toString() + " - " + faces2.toString() );

function myPercentFormat(i){
    return (i*100).toFixed(3).toString() + "%";
}


class Fighter {
    constructor(number, faces){
        this.number = number;
        this.faces = faces;
        // combinb - values starts at "number"
        this.combinb = [];
        // current combi - starts at 0, 
        this.combi = new Array(this.number).fill(1);
        myconsole.log(this.combi);
    }

    // takes combi as global variable
    // index starts at 0
    nextcombi(index){
        let last = this.combi[index];
        if (last < this.faces) {
        this.combi[index] = last + 1;
        return true;
        }
        if (index == 0)
            return false; // we are at the end
        this.combi[index] = 1;
        return this.nextcombi(index-1);
    }

    takeCombiIntoAccount(){
        let total = this.combi.reduce(function(a, b){return a+b;});
        if (this.combinb[total] == undefined)
            this.combinb[total] = 1;
        else
            this.combinb[total] = this.combinb[total] + 1 ;
    }

    check(){
        return this.combinb.reduce(function(a, b){return a+b;}) == Math.pow(this.faces,this.number) ? "Validated" : "Error" ;
    }

    printCombiNb(){
        let siz = this.combinb.length;
        let val = 0
        let maxcombi = Math.pow(this.faces,this.number);
        console.log("--------------------------------------------");
        console.log("Value|Nb of combinations|%");
        for (let i=0;i<siz;i++){
            val = this.combinb[i];
            if (val != undefined)
                console.log(i + "|" + val + "|" + myPercentFormat(val/maxcombi));
        }
    }

    moreOrEqualThanTargetNumber(tn){
        if (tn > this.number*this.faces)
            return 0;
        if (tn <= this.number)
            return 1; // 100%
        let siz = this.combinb.length;
        let sub = this.combinb.slice(tn,siz);
        if (sub.length == 0) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    strictlyMoreThanTargetNumber(tn){
        if (tn >= this.number*this.faces)
            return 0;
        let siz = this.combinb.length;
        let sub = this.combinb.slice(tn+1,siz);
        if (sub.length == 0) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    strictlyLessThanTargetNumber(tn){
        if (tn <= this.number)
            return 0;
        let siz = this.combinb.length;
        let sub = this.combinb.slice(this.number,tn);
        if (sub.length == 0) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    lessOrEqualThanTargetNumber(tn){
        if (tn > this.number*this.faces)
            return 0;
        let siz = this.combinb.length;
        let sub = this.combinb.slice(this.number,tn+1);
        if (sub.length == 0) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }
    
    percentagesComparedToTargetNumber(){
        let max = this.number*this.faces;
        console.log("--------------------------------------------");
        console.log("TN|More of equal|Strictly more|Less or equal|Strictly less");
        for (let tn=this.number;tn<=max;tn++){
            console.log(tn.toString() + " | "
                        + myPercentFormat(this.moreOrEqualThanTargetNumber(tn)) + " | "
                        + myPercentFormat(this.strictlyMoreThanTargetNumber(tn)) + " | "
                        + myPercentFormat(this.lessOrEqualThanTargetNumber(tn)) + " | "
                        + myPercentFormat(this.strictlyLessThanTargetNumber(tn)) );
        }
    }

    calculate() {
        this.takeCombiIntoAccount(); // 1,1,...,1 the first
        while (this.nextcombi(this.number-1)){
            myconsole.log(this.combi);
            this.takeCombiIntoAccount()
        }
        myconsole.log(this.check());
        //myconsole.log(this.combinb);
        console.log("=> " + Math.pow(this.faces,this.number).toString() + " combinations");
        //this.printCombiNb();
        this.percentagesComparedToTargetNumber();
    }

}

// we are on the scale of fighter1
// we start at TN = number1
// we stop  at TN = number1 * faces1
let fighter1 = new Fighter(number1,faces1);
fighter1.calculate();

let fighter2 = new Fighter(number2,faces2);
fighter2.calculate();

// seen from fighter1
let win=0, loose=0;
console.log("--------------------------------------------");
console.log("--- Seen from fighter 1 ---");

let max = number1 * faces1;
for (let tn=number1;tn<=max;tn++){
    // real win
    let a = fighter1.moreOrEqualThanTargetNumber(tn);
    let b = fighter2.strictlyLessThanTargetNumber(tn);
    console.log("WIN");
    console.log(a);
    console.log(b);
    let temp1 = a*b;
    win += temp1;
    //real loose
    a = fighter1.strictlyLessThanTargetNumber(tn);
    b = fighter2.moreOrEqualThanTargetNumber(tn);
    console.log("LOOSE");
    console.log(a);
    console.log(b);
    let temp2 =  a*b;
    myconsole.log("TN = " + tn.toString() + " - WIN % : " +  myPercentFormat(temp1) + " - LOOSE % : " + myPercentFormat(temp2));
    loose += temp2;
}




