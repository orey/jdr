//=============================================================
// Proba versus: calculates probas in combat in a versus mode
// rey.olivier@gmail.com
// May 21 2022
// GNU GPL V3
//=============================================================
"use strict";

const VERBOSE = true;
//const VERBOSE=false;

const PERCENTAGE_FIGURE_NUMBER = 2;

let myconsole = {
    log : function(s) {
        if (VERBOSE) console.log(s);
    }
}

function usage() {
    console.log("Usage:");
    console.log("> node proba [XdY+Z] [AdB+C]");
    console.log("X,Y,Z, A, B and C are integers. Z and C are optional.");
    process.exit(0);
}

function parseString(s){
    let nb, dice, mod, main; // strings
    if (s.includes('+')) {
        [main, mod] = s.split('+');
        mod = Number(mod);
    }
    else if (s.includes('-')) {
        [main, mod] = s.split('-');
        mod = Number('-' + mod);
    }
    else {
        mod = 0;
        main = s;
    }
    if (main.includes('d'))
        [nb, dice] = main.split("d");
    else if (main.includes('D'))
        [nb, dice] = main.split("D");
    else {
        myconsole.log("Something wrong here: " + main + " is not understood. Exiting...");
        process.exit(0);
    }
    nb = Number(nb);
    dice = Number(dice);
    return [nb, dice, mod]
}

function testParseString() {
    myconsole.log(parseString("12d6"));
    myconsole.log(parseString("4d12+4"));
    myconsole.log(parseString("1d6-1"));
}


function myPercentFormat(i){
    return (i*100).toFixed(PERCENTAGE_FIGURE_NUMBER).toString() + "%";
}

function myPercentFormatRound(i){
    return (i*100).toFixed(0).toString() + "%";
}


class Fighter {
    constructor(number, faces, mod){
        this.number = number;
        this.faces = faces;
        this.mod = mod;
        // combinb - values starts at "number"
        // C'est le tableau de stockage du nombre de combinaisons. On va compter
        // le total de la combinaison en faisant : combinb[total]++
        this.combinb = [];
        // current combi - combi courante - starts at 0,
        // combi est la combinaison courante du lancé de dés.
        // Exemple 4d6 => combi = [1, 1, 1, 1] avec les 4 slots des 4 dés
        this.combi = new Array(this.number).fill(1);
        //myconsole.log(this.combi);
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
        // on calcule le total de la combi
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

    equalTargetNumber(tn){
        return this.combinb[tn] / Math.pow(this.faces,this.number);  
    }

    moreOrEqualThanTargetNumber(tn){
        if (tn > this.number*this.faces)
            return 0;
        if (tn <= this.number)
            return 1; // 100%
        let siz = this.combinb.length;
        let sub = this.combinb.slice(tn,siz);
        if ((sub.length == 0)||(sub[0]==undefined)) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    strictlyMoreThanTargetNumber(tn){
        if (tn >= this.number*this.faces)
            return 0;
        if (tn < this.number)
            return 1; // 100%
        let siz = this.combinb.length;
        let sub = this.combinb.slice(tn+1,siz);
        if ((sub.length == 0)||(sub[0]==undefined)) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    strictlyLessThanTargetNumber(tn){
        if (tn <= this.number)
            return 0;
        let siz = this.combinb.length;
        let sub = this.combinb.slice(this.number,tn);
        if ((sub.length == 0)||(sub[0]==undefined)) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }

    lessOrEqualThanTargetNumber(tn){
        if (tn < this.number)
            return 0;
        let siz = this.combinb.length;
        let sub = this.combinb.slice(this.number,tn+1);
        if ((sub.length == 0)||(sub[0]==undefined)) return NaN;
        return sub.reduce(function(a, b){return a+b;}) / Math.pow(this.faces,this.number);    
    }
    
    percentagesComparedToTargetNumber(){
        let max = (this.number*this.faces);
        console.log("--------------------------------------------");
        console.log("TN|More of equal|Strictly more|Less or equal|Strictly less");
        for (let tn=this.number;tn<=max;tn++){
            // seul endroit où la modification mod intervient : sur le display des TN mais pas sur les stats
            console.log((tn+this.mod).toString() + " | "
                        + myPercentFormat(this.moreOrEqualThanTargetNumber(tn)) + " | "
                        + myPercentFormat(this.strictlyMoreThanTargetNumber(tn)) + " | "
                        + myPercentFormat(this.lessOrEqualThanTargetNumber(tn)) + " | "
                        + myPercentFormat(this.strictlyLessThanTargetNumber(tn)) );
        }
    }

    calculate() {
        this.takeCombiIntoAccount(); // 1,1,...,1 the first
        while (this.nextcombi(this.number-1)){
            //myconsole.log(this.combi);
            this.takeCombiIntoAccount()
        }
        myconsole.log(this.check());
        //myconsole.log(this.combinb);
        console.log("=> " + Math.pow(this.faces,this.number).toString() + " combinations");
        //this.printCombiNb();
        this.percentagesComparedToTargetNumber();
    }

}

function main(){
    let args = process.argv;
    if (args.length != 4)
        usage();
    myconsole.log(args);

    // get params
    let tab1 = parseString(args[2]);
    myconsole.log(tab1);
    let tab2 = parseString(args[3]);
    myconsole.log(tab2);

    // we are on the scale of fighter1
    // we start at TN = number1
    // we stop  at TN = number1 * faces1
    let fighter1 = new Fighter(tab1[0],tab1[1], tab1[2]);
    fighter1.calculate();

    let fighter2 = new Fighter(tab2[0],tab2[1], tab2[2]);
    fighter2.calculate();

    // seen from fighter1
    let win=0, loose=0;
    console.log("--------------------------------------------");
    console.log("--- Seen from fighter 1: strict WIN, loose or equal ---");

    let max = tab1[0] * tab1[1] + tab1[2];
    for (let tn=tab1[0]+tab1[2];tn<=max;tn++){
        // real win
        let temp1 = fighter1.equalTargetNumber(tn-tab1[2]) * fighter2.strictlyLessThanTargetNumber(tn-tab2[2]);
        // loose or ex-aequo
        let temp2 = fighter1.equalTargetNumber(tn-tab1[2]) * fighter2.moreOrEqualThanTargetNumber(tn-tab2[2]);
        console.log("TN = " + tn + " - Win = " + myPercentFormat(temp1) + " - Loose = " + myPercentFormat(temp2));
        win += temp1;
        loose += temp2;
    }

    let win1 = win
    let loose1 = loose
    console.log("WIN = " + myPercentFormat(win) + " - LOOSE = " +  myPercentFormat(loose));
    console.log( myPercentFormat(win+loose));

    win =0;
    loose = 0;
    console.log("--- Seen from fighter 1: win or equal, strict loose ---");
    for (let tn=tab1[0]+tab1[2];tn<=max;tn++){
        // real win
        let temp1 = fighter1.equalTargetNumber(tn-tab1[2]) * fighter2.lessOrEqualThanTargetNumber(tn-tab2[2]);
        // loose or ex-aequo
        let temp2 = fighter1.equalTargetNumber(tn-tab1[2]) * fighter2.strictlyMoreThanTargetNumber(tn-tab2[2]);
        console.log("TN = " + tn + " - Win = " + myPercentFormat(temp1) + " - Loose = " + myPercentFormat(temp2));
        win += temp1;
        loose += temp2;
    }

    let win2 = win
    let loose2 = loose
    console.log("WIN = " + myPercentFormat(win) + " - LOOSE = " +  myPercentFormat(loose));
    console.log( myPercentFormat(win+loose));

    console.log("--------------------------------------------");
    console.log("loose1 - loose2 = " + myPercentFormat(loose1 - loose2))
    console.log("win2 - win1 = " + myPercentFormat(win2 - win1))    
    console.log("STRICT WIN = " + myPercentFormat(win1) + " EQUAL: " +  myPercentFormat(win2-win1) + " STRICT LOOSE: " + myPercentFormat(loose2))
    console.log("STRICT WIN = " + myPercentFormatRound(win1) + " EQUAL: " +  myPercentFormatRound(win2-win1) + " STRICT LOOSE: " + myPercentFormatRound(loose2))
  
}

main();

