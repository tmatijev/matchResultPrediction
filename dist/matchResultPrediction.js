"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchResultPrediction = matchResultPrediction;
function matchResultPrediction(d) {
    if (d.homeTeamCoef >= 1 || d.awayTeamCoef >= 1) {
        console.warn('Team coefficient must be lower than 1!');
        return false;
    }
    const random = Math.random();
    const randomDraw = Math.floor(Math.random() * d.drawMax);
    const randomWin = Math.floor(Math.random() * d.winMax) + 1;
    const biggerCoef = d.homeTeamCoef > d.awayTeamCoef ? d.homeTeamCoef : d.awayTeamCoef;
    const smallerCoef = d.homeTeamCoef > d.awayTeamCoef ? d.awayTeamCoef : d.homeTeamCoef;
    const drawChance = (1 - (biggerCoef - smallerCoef)) / 3;
    let homeTeamScore = 0;
    let awayTeamScore = 0;
    if (random < drawChance) {
        homeTeamScore = randomDraw;
        awayTeamScore = randomDraw;
    }
    else if (random < d.homeTeamCoef) {
        homeTeamScore = randomWin;
        awayTeamScore = randomWin === 1 ? 0 : Math.floor(Math.random() * randomWin - 1) + 1;
    }
    else {
        awayTeamScore = randomWin;
        homeTeamScore = randomWin === 1 ? 0 : Math.floor(Math.random() * randomWin - 1) + 1;
    }
    return {
        homeTeamScore,
        awayTeamScore,
    };
}
