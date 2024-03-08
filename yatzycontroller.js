function registerNumberOfPlayers(playerCount) {
    numberOfPlayers = playerCount
    viewCode = 1;
    updateView()
}
function readName(theName, playernumber) {
    playerNames[playernumber] = theName
}
function registerPlayersNames() {
    scoresheets.push(firstColumn)
    let counter = 1
    for (let i = 0; i < numberOfPlayers; i++) {
        if (playerNames[i]) scoresheets.push([playerNames[i], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
        else {
            scoresheets.push(['Anonym ' + counter, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
            counter++
        }
    }
    viewCode = 2;
    updateView()
}
function randomDiceThrow() {
    return Math.floor(6 * Math.random()) + 1
}
function keepTheDice(index) {
    keptDices[index] = !keptDices[index]
}
function throwTheDices() {
    if (madeThrows >= 3) return
    else {
        for (let i = 0; i < diceValues.length; i++) {
            if (!keptDices[i]) {
                diceValues[i] = randomDiceThrow()
            }
        }
    }
    madeThrows++
    updateView()
}
function countOverTheLine(dices, valueToCheck) {
    let theScoreHere = 0
    for (let i = 0; i < dices.length; i++) {
        if (dices[i] == valueToCheck) {
            theScoreHere += valueToCheck
        }
    }
    return theScoreHere
}
function findHighestPair(dices) {
    let theScoreHere = 0
    let highestValue = dices[0];
    for (let i = 1; i < dices.length; i++) {
        if (dices[i] == highestValue) {
            theScoreHere = 2 * highestValue
        }
        else highestValue = dices[i]
    }
    return theScoreHere
}
function findTwoPairs(dices) {
    if ((dices[0] == dices[1] && dices[2] == dices[3] && dices[0] != dices[3]) ||
        (dices[0] == dices[1] && dices[3] == dices[4] && dices[0] != dices[4]) ||
        (dices[1] == dices[2] && dices[3] == dices[4] && dices[1] != dices[4])) {
        return 2 * dices[1] + 2 * dices[3]
    }
    return 0
}
function findThreeAlike(dices) {
    if ((dices[0] == dices[1] && dices[1] == dices[2]) ||
        (dices[1] == dices[2] && dices[2] == dices[3]) ||
        (dices[2] == dices[3] && dices[3] == dices[4])) {
        return 3 * dices[2]
    }
    return 0
}
function findFourAlike(dices) {
    if ((dices[0] == dices[1] && dices[1] == dices[2] && dices[2] == dices[3]) ||
        (dices[1] == dices[2] && dices[2] == dices[3] && dices[3] == dices[4])) {
        return 4 * dices[1]
    }
    return 0
}
function findSmallStraight(dices) {
    if (dices[0] == 1 && dices[1] == 2 && dices[2] == 3 && dices[3] == 4 && dices[4] == 5) return 15
    return 0
}
function findBigStraight(dices) {
    if (dices[0] == 2 && dices[1] == 3 && dices[2] == 4 && dices[3] == 5 && dices[4] == 6) return 20
    return 0
}
function findHouse(dices) {
    if (dices[0] == dices[1] && dices[1] == dices[2] && dices[3] == dices[4] && dices[0] != dices[4]) return 3 * dices[0] + 2 * dices[4]
    if (dices[0] == dices[1] && dices[2] == dices[3] && dices[3] == dices[4] && dices[0] != dices[4]) return 2 * dices[0] + 3 * dices[4]
    return 0
}
function countChance(dices) {
    return dices[0] + dices[1] + dices[2] + dices[3] + dices[4]
}
function findYahtzee(dices) {
    if (dices[0] == dices[1] && dices[1] == dices[2] && dices[2] == dices[3] && dices[3] == dices[4]) return 50
    return 0
}
function sumOverTheLine() {
    let theTotalScore = { allFilled: true, theScore: 0 }
    for (let i = 1; i <= 6; i++) {
        if (typeof scoresheets[playerToThrow + 1][i] == 'string') {
            theTotalScore.allFilled = false
        }
        else {
            theTotalScore.theScore += scoresheets[playerToThrow + 1][i]
        }
    }
    return theTotalScore
}
function sumTheWholeGrid() {
    for (let i = 1; i <= numberOfPlayers; i++) {
        let playersScore = 0
        for (let j = 7; j <= 17; j++) {
            playersScore += scoresheets[i][j]
        }
        scoresheets[i][18] = playersScore
    }
}
function placeTheScore(rowIndex) {
    if (madeThrows == 0 || finishedRounds == 15 || scoresheets[playerToThrow + 1][rowIndex] != '') return
    let useDices = diceValues.sort(function (a, b) { return a - b; });
    if (overTheLine.includes(rowIndex)) {
        scoresheets[playerToThrow + 1][rowIndex] = countOverTheLine(useDices, rowIndex)
        let checkScore = sumOverTheLine()
        if (checkScore.allFilled) {
            scoresheets[playerToThrow + 1][7] = checkScore.theScore
            if (checkScore.theScore >= 63) scoresheets[playerToThrow + 1][8] = 50
            else scoresheets[playerToThrow + 1][8] = 0
        }
    }
    if (rowIndex == 9) scoresheets[playerToThrow + 1][rowIndex] = findHighestPair(useDices)
    if (rowIndex == 10) scoresheets[playerToThrow + 1][rowIndex] = findTwoPairs(useDices)
    if (rowIndex == 11) scoresheets[playerToThrow + 1][rowIndex] = findThreeAlike(useDices)
    if (rowIndex == 12) scoresheets[playerToThrow + 1][rowIndex] = findFourAlike(useDices)
    if (rowIndex == 13) scoresheets[playerToThrow + 1][rowIndex] = findSmallStraight(useDices)
    if (rowIndex == 14) scoresheets[playerToThrow + 1][rowIndex] = findBigStraight(useDices)
    if (rowIndex == 15) scoresheets[playerToThrow + 1][rowIndex] = findHouse(useDices)
    if (rowIndex == 16) scoresheets[playerToThrow + 1][rowIndex] = countChance(useDices)
    if (rowIndex == 17) scoresheets[playerToThrow + 1][rowIndex] = findYahtzee(useDices)
    playerToThrow = (playerToThrow + 1) % numberOfPlayers
    if (playerToThrow == 0) finishedRounds++
    if (finishedRounds == 15) {
        sumTheWholeGrid()
        madeThrows = 3
        keptDices = [false, false, false, false, false]
        updateView()
    }
    else {
        madeThrows = 0
        diceValues = [1, 1, 1, 1, 1]
        keptDices = [false, false, false, false, false]
        updateView()
    }
}
