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
        for (let i=0;i<siz;i++){
            val = this.combinb[i];
            if (val != undefined)
                console.log(i + " : " + val);
        }
    }

    moreThanOrEqualToTargetNumber(tn){
        if (tn > this.number*this.faces)
            return 0;
        let siz = this.combinb.length;
        let sub = this.combinb.slice(tn,siz);
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    percentageMoreThanOrEqualToTargetNumber(format=1){
        let max = this.number*this.faces;
        for (let tn=this.number;tn<=max;tn++){
            if (format !=1)
                console.log("TN = "
                            + tn.toString()
                            + " - "
                            + (this.moreThanOrEqualToTargetNumber(tn)*100).toFixed(2).toString()
                            + "%");
            else
                console.log(tn.toString()
                            + ","
                            + (this.moreThanOrEqualToTargetNumber(tn)*100).toFixed(2).toString()
                            + "%");
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
        this.printCombiNb();
        this.percentageMoreThanOrEqualToTargetNumber();
    }

}

let fighter1 = new Fighter(number1,faces1);
fighter1.calculate();

let fighter2 = new Fighter(number2,faces2);
fighter2.calculate();



