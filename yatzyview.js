function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h2>YATZY</h2>
        ${viewCode == 0 ? enterNumberOfPlayers() : viewCode == 1 ? enterPlayersName() : makePlayScreen()}
    `
}
function makeTable() {
    let tableHtml = ''
    for (let i = 0; i < scoresheets[0].length; i++) {
        let rowHtml = ''
        for (let j = 0; j <= numberOfPlayers; j++) {
            if (specialRows.includes(i)) {
                rowHtml += `<td class="graysquare">${scoresheets[j][i]}</td>`
            }
            else {
                if (j == 0) {
                    rowHtml += `<td class="whitesquare" onclick="placeTheScore(${i})">${scoresheets[j][i]}</td>`
                }
                else {
                    rowHtml += `<td class="whitesquare">${scoresheets[j][i]}</td>`
                }
            }
        }
        tableHtml += `<tr>${rowHtml}</tr>`
    }
    return `<table class="theTable">${tableHtml}</table>`
}
function enterNumberOfPlayers() {
    let firstHtml = `<option value="none" selected disabled hidden>Vel talet på spelarar</option>`
    for (let i = 1; i <= maxNumberOfPlayers; i++) {
        firstHtml += `<option value="${i}">${i}</option>`
    }
    return `<select onchange="registerNumberOfPlayers(this.value)">${firstHtml}</select>`
}
function enterPlayersName() {
    let secondHtml = ''
    for (let i = 0; i < numberOfPlayers; i++) {
        secondHtml += `<tr><td>Spelar ${i + 1}</td><td><input type="text" onchange="readName(this.value,${i})"/></td></tr>`
    }
    return `<p>Skriv inn namna til spelarane</p><table>${secondHtml}</table><button onclick="registerPlayersNames()">Registrer</button>`
}
function makeDices() {
    let topHtml = `<div>Det er ${playerNames[playerToThrow]} sin tur.</div>`;
    if (madeThrows < 3) topHtml += `<div>Trykk for kast nummer ${madeThrows + 1}</div>`
    topHtml += `<button onclick="throwTheDices()">Kast terningane</button>`
    topHtml += `<div><br>For å beholde ein terning før neste kast, så kryss av på "Hold fast".<br>
            Når du er ferdig og skal registrere poenga dine, så trykk på feltet du vil registrere skåren på <br>
            i kolonne 1. Dette kan sjølvsagt gjerast også før du har kasta tre kast.<br><br></div>`
    let diceHtml = `<td class="whitesquare">Verdiar</td><td class="whitesquare">Hold fast</td>`
    for (let i = 0; i < numberOfDices; i++) {
        // ${theDices[i]} under skal skiftast ut når terningkasta er ordna. Checkboxane må også ordnast
        if (keptDices[i]) {
            diceHtml += `<tr><td class="whitesquareExtra">${theDices[diceValues[i] - 1]}</td>
                        <td class="whitesquare"><input type="checkbox" onchange="keepTheDice(${i})" checked></td></tr>`
        }
        else {
            diceHtml += `<tr><td class="whitesquareExtra">${theDices[diceValues[i] - 1]}</td>
                        <td class="whitesquare"><input type="checkbox" onchange="keepTheDice(${i})"></td></tr>`
        }
    }
    return `${topHtml}<table class="theTable">${madeThrows > 0 ? diceHtml : ''}</table>`
}
function makePlayScreen() {
    return `<table><td>${makeTable()}</td><td class="emptyColumn"></td><td>${makeDices()}</td></table>`
}

