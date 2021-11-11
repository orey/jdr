// Test
const SponsorDice = { pattern: "1D10",
                  values:  [
                      "Amour à sens unique",
                      "Dénigré",
                      "Honni",
                      "Hybride",
                      "Inapte",
                      "Limitation",
                      "Pauvre",
                      "Phobie",
                      "Souffre-douleur",
                      "Trouble de l'apprentissage"
                  ]};


/*********************************************************************/
const Sponsor = [
    // Elements
    [
        "A storm is coming.",
        "A snow storm is coming.",
        "The desert heat becomes unbearable.",
        "Is is raining so hard that all roads are blocked."
    ],
    // Need shelter
    [
        "Bad people are searching for the PCs and they need to hide.",
    ],
    // Organization
    [
        "Agency X is calling the PCs.",
        "The Club Pythagore is calling the PCs",
    ],
    // People
    [
        "Mister Bean is calling the PCs.",
        "The cousin of a PC is calling him/her.",
    ],
    //Various
    "One PC caught a disease and must see a doctor.",
];

/*********************************************************************/
const Destination = [
    // Towns
    [
        "go to Paris",
        "go to Berlin",
        "go to London",
        "go to Tombouctou",
    ],
    // Planets
    [
        "travel to Trantor",
        "travel to the Moon",
        "travel to Mars",
    ],
    // Time travel
    [
        "travel back in 1920",
        "go back to the Stone Age",
    ],
    // Parallel universes
    [
        "enter a parallel universe",
    ],
    // D&D
    [
        "go to the city of Laelith",
        "go the the castle of Lord Byron",
    ],
    "use a potion to enter in trance",
    "use a potion to go into a dream",
];




/*********************************************************************/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        SponsorDice,
        Sponsor,
        Destination, 
    }
}

