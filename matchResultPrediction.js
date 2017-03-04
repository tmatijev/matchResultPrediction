module.exports = function (d) {
  /**
   * d.homeTeamCoef {Number}
   * d.awayTeamCoef {Number}
   * d.drawMax {Number}
   * d.winMax {Number}
   */

  if (d.homeTeamCoef >= 1 || d.awayTeamCoef >= 1) {
    console.warn('Team coefficient must be lower than 1!');
    return false;
  }

  let random = Math.random()
  let randomDraw = Math.floor(Math.random() * d.drawMax)
  let randomWin = Math.floor(Math.random() * d.winMax) + 1
  let biggerCoef = d.homeTeamCoef > d.awayTeamCoef ? d.homeTeamCoef : d.awayTeamCoef
  let smallerCoef = d.homeTeamCoef > d.awayTeamCoef ? d.awayTeamCoef : d.homeTeamCoef
  let drawChance = (1 - (biggerCoef - smallerCoef)) / 3
  let homeTeamScore = 0
  let awayTeamScore = 0

  if (random < drawChance) {
    homeTeamScore = randomDraw
    awayTeamScore = randomDraw
  } else if (random < d.homeTeamCoef) {
    homeTeamScore = randomWin;
    awayTeamScore = randomWin === 1 ? 0 : Math.floor(Math.random() * randomWin - 1) + 1
  } else {
    awayTeamScore = randomWin
    homeTeamScore = randomWin === 1 ? 0 : Math.floor(Math.random() * randomWin - 1) + 1
  }

  return {
    homeTeamScore,
    awayTeamScore
  }
}