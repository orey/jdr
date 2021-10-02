const fs = require('fs');

'use strict';

/*
const D6 = {
    min : 1,
    max : 6,
    faces : 6,
    proba : 1/6
};

function AllProbas(dice, number) {
    let min = dice.min * number;
    let max = dice.max * number;
    let nb_combinations = dice.faces ** number;

    let combvalues = {};
    for (let i = min; i<= max; i++)
        comvalues[i] = 0;

    let indices = {};
    for (let i = 1; i<= number; i++)
        indices[i] = 1;

    let cursor = number;
    for (let j=1; j <= nb_combinations;j++) {
        // calculate value
        let val = 0;
        for (let i = 1; i<= number; i++)
            val += indices[i];
        combvalues[val] += 1;
        // switch to another combination
        if (indice[cursor] != dice.max)
            indice[cursor] += 1;
        else {
            indice[cursor] = dice.min;
            cursor -= 1;
            indice[cursor] += 1;


            if (cursor == 0)
                break;
            else
        }
    }
    

}*/


//                 0  1  2     3     4     5      6      7      8      9      10    11    12
const proba_2D6 = [0, 0, 2.78, 5.56, 8.33, 11.11, 13.89, 16.67, 13.89, 11.11, 8.33, 5.56, 2.78];

// Gives the probability in percentage
function getProbaWildDice(number) {
    if ( number % 6 == 0 )
        return 0;
    let n = Math.floor(number / 6);
    return (1/6) ** (n+1);
}

function getProba2D6(number) {
    if ((number < 2) || (number > 12))
        return 0;
    else
        return proba_2D6[number] / 100;
}


function calculate() {
    // init combis
    let combi = {};
    for (let i = 3; i <= 62; i++)
        combi[i] = 0;
    //calculte probas
    for (let i = 2; i <= 12; i++)
        for (let j = 1; j <= 50; j++)
            combi[i+j] += getProba2D6(i) * getProbaWildDice(j);
    //prepare CSV dump
    let cumuls_above = {}
    let cumul = 0;
    for (let i = 62; i >= 3; i--) {
        cumul += combi[i];
        cumuls_above[i] = cumul;
    }
    let csvstr = "";
    for (let i = 3; i <= 62; i++) {
        csvstr += i.toString() + ";" + (combi[i]*100).toString() + ";" + (cumuls_above[i] * 100).toString() + "\n";
    }
    fs.writeFile('wild-dice.csv', csvstr, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("CSV dump done");
    });
    // return combis
    return combi;
}

//Viewing and calling functions
for (let i = 0; i < 50 ; i++)
    console.log("2D6 proba of " + i + ": " + getProba2D6(i) + "%");
for (let i = 0; i < 50 ; i++)
    console.log("Wild dice proba of " + i + ": " + getProbaWildDice(i) + "%");

let comb = calculate();
console.log(comb);


