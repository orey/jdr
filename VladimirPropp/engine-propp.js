/**********************************************
 * Engine for Propp
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: November 2021 
 ***********************************************/
'use strict';

const Roles = [
    "Hero|Heroine",  //index:0
    "Wife|Husband",  //1
    "Parents",       //2
    "FamilyMembers", //3
    "Host",          //4   
];


// Absentation: Beta
const Beta = [
    { // Beta 1
        roles: [1,2,3,4],
        values: [
            "go to work",
            "go to the forest",
            "leave for a long trip",
            "leave for commerce",
            "leave for war",
            "leave for business"
        ]
    },
    { // Beta 2
        roles: [2],
        values: [
            "are dead"
        ]
    },
    { // Beta 3
        roles: [0],
        values: [
            "go on a visit",
            "go fishing",
            "go for a walk",
            "go out to gather berries"
        ]
    }
];

/* Attention ce sont les mêmes rôles que dans la partie d'avant */

// Interdiction to the hero: Gamma
const Gamma = [
    { // Gamma 1
        roles: [1,2,3,4],
        values: [
            "do not look into $closet|box|room$",
            "do not venture in $the courtyard|the forest$",
            "do not $make any noise$",
            "do not leave $the tower$",
//reprendre ici

        ]
    },




