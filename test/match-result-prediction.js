var matchPrediction = require('../');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var all = chai.use(require('chai-things'));

function generatePrediction (type) {
  var scoreArray = [];

  for (var i = 0; i < 300; i++) {
    var r = matchPrediction({
      homeTeamCoef: 0.98,
      awayTeamCoef: 0.65,
      drawMax: 3,
      winMax: 5
    });

    if (type === 'draw-check' && (r.homeTeamScore === r.awayTeamScore)) {
      scoreArray.push(true);
      continue;
    }

    if (type === 'draw' && (r.homeTeamScore === r.awayTeamScore)) {
      scoreArray.push(r.homeTeamScore);
      continue;
    }

    var score = 0;

    switch (type) {
      case 'win':
        score = (r.homeTeamScore > r.awayTeamScore) ? r.homeTeamScore : r.awayTeamScore;
        scoreArray.push(score);
      case 'loose':
        score = r.homeTeamScore < r.awayTeamScore ? r.homeTeamScore : r.awayTeamScore;
        scoreArray.push(score);
      default:
    }
  }

  return scoreArray;
}

describe("matchPrediction", function () {
  it('Should return false if homeTeamCoef is higher or equal than 1', function () {
    var r = matchPrediction({
      homeTeamCoef: 1,
      awayTeamCoef: 0.75,
      drawMax: 3,
      winMax: 5
    });

    assert.equal(r, false)
  });

  it('Should return false if awayTeamCoef is higher or equal than 1', function () {
    var r = matchPrediction({
      homeTeamCoef: 0.88,
      awayTeamCoef: 1,
      drawMax: 3,
      winMax: 5
    });

    assert.equal(r, false)
  });

  it('Winning team should never get score higher than 5', function () {
    var generatedArray = generatePrediction('win');
    generatedArray.should.all.be.below(6);
  });

  it('Loosing team should never get score higher than 4', function () {
    var generatedArray = generatePrediction('loose');
    generatedArray.should.all.be.below(5);
  });

  it('Drawing teams should have same scores', function () {
    var generatedArray = generatePrediction('draw-check');
    generatedArray.should.all.be.equal(true);
  });

  it('Drawing teams should have scores lower or equal to 3', function () {
    var generatedArray = generatePrediction('draw');
    generatedArray.should.all.be.below(4);
  });
});