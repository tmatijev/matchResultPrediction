"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchResultPrediction_1 = require("./matchResultPrediction");
// Run multiple predictions to see different outcomes
for (let i = 0; i < 5; i++) {
    const result = (0, matchResultPrediction_1.matchResultPrediction)({
        homeTeamCoef: 0.91, // Strong home team
        awayTeamCoef: 0.75, // Weaker away team
        drawMax: 3,
        winMax: 5
    });
    console.log(`Match ${i + 1} result:`, result);
}
// Test with equal teams
const equalTeams = (0, matchResultPrediction_1.matchResultPrediction)({
    homeTeamCoef: 0.80,
    awayTeamCoef: 0.80,
    drawMax: 3,
    winMax: 5
});
console.log('\nEqual teams result:', equalTeams);
// Test with very unbalanced teams
const unbalancedTeams = (0, matchResultPrediction_1.matchResultPrediction)({
    homeTeamCoef: 0.95,
    awayTeamCoef: 0.45,
    drawMax: 3,
    winMax: 5
});
console.log('\nUnbalanced teams result:', unbalancedTeams);
