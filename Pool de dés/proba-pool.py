#============================================
# Copyleft O. Rey, rey.olivier@gmail.com
# May 2024
#============================================
import sys


def usage():
    print("Usage:")
    print("> python proba-pool.py [faces]")
    print("'faces' must be integer")
    print("We'll calculate probabilities for successes per threshold (1-7) from 1 to 7 dice")
    sys.exit(0)


# f : number of faces of dice 1
# g : number of faces of dice 2
def calculateCombis(f, g):
    combis = []
    if type(g) is int:
        for i in range(1,f+1):
            for j in range(1,g+1):
                combis.append([i,j])
    else:
        for i in range(1,f+1):
            for j in range(0, len(g)):
                combis.append([i,*g[j]])
    return combis

def intelligentAdd(index, dict):
    cumul = 0
    for elem in dict:
        if elem >= index:
            cumul += dict[elem]
    return cumul


def calculateProbas(combis, threshold):
    print("Number of combinations: " + str(len(combis)))
    nos = {} #number of successes
    siz = len(combis)
    sizenos = len(combis[0]) + 1 # from 0 to len(combis) possibls successes
    # init number of successes to 0
    for i in range(0,sizenos):
        nos[i] = 0
    # count number of successes
    for i in range(0,siz):
        comb = combis[i]
        number = 0
        for elem in comb:
            if elem >= threshold:
                number += 1
        nos[number] +=1
    # create exact probas to get i successes
    probs = {}
    for i in range(0,sizenos):
        probs[i] = nos[i]/siz
    # create cumuls to have at least X successes
    cumuls = {}
    for i in range(0,sizenos):
        cumuls[i] = intelligentAdd(i,probs)
    return [probs, cumuls]


def printPAC(message, probs, cumuls):
    print(message + " - Exact   ", end= " | ")
    for elem in probs:
        print(elem, "-","{: 7.1%}".format(probs[elem]),end=' | ')
    print("\n" + message + " - At least", end= " | ")
    for elem in cumuls:
        print(elem, "-","{: 7.1%}".format(cumuls[elem]),end=' | ')
    print("\nEnd of display")


def main(faces):
    dice = int(faces)
    print("Creating probas for dice with " + faces + " faces")

    print("---------------------------------------")
    combis = calculateCombis(6,6)
    [probs, cumuls] = calculateProbas(combis,4)
    printPAC("2D6, seuil 4", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,5)
    printPAC("2D6, seuil 5", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,6)
    printPAC("2D6, seuil 6", probs,cumuls)

    print("---------------------------------------")
    combis = calculateCombis(6,calculateCombis(6,6))
    [probs, cumuls] = calculateProbas(combis,4)
    printPAC("3D6, seuil 4", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,5)
    printPAC("3D6, seuil 5", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,6)
    printPAC("3D6, seuil 6", probs,cumuls)

    print("---------------------------------------")
    combis = calculateCombis(6, calculateCombis(6,calculateCombis(6,6)))
    [probs, cumuls] = calculateProbas(combis,4)
    printPAC("4D6, seuil 4", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,5)
    printPAC("4D6, seuil 5", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,6)
    printPAC("4D6, seuil 6", probs,cumuls)
    
    print("---------------------------------------")
    combis = calculateCombis(6, calculateCombis(6, calculateCombis(6,calculateCombis(6,6))))
    [probs, cumuls] = calculateProbas(combis,4)
    printPAC("5D6, seuil 4", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,5)
    printPAC("5D6, seuil 5", probs,cumuls)
    [probs, cumuls] = calculateProbas(combis,6)
    printPAC("5D6, seuil 6", probs,cumuls)

    
if __name__ == "__main__":
    if len(sys.argv) != 2:
        usage()
    main(sys.argv[1])
    
