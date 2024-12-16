interface MatchPredictionParams {
  homeTeamCoef: number;
  awayTeamCoef: number;
  drawMax: number;
  winMax: number;
}

interface MatchResult {
  homeTeamScore: number;
  awayTeamScore: number;
}

type TeamCoefficients = {
  bigger: number;
  smaller: number;
}

const getTeamCoefficients = (home: number, away: number): TeamCoefficients => ({
  bigger: Math.max(home, away),
  smaller: Math.min(home, away)
});

const calculateDrawChance = ({ bigger, smaller }: TeamCoefficients): number => 
  (1 - (bigger - smaller)) / 3;

const generateRandomScore = (max: number): number => 
  Math.floor(Math.random() * max);

const generateWinningScore = (winMax: number): number => 
  generateRandomScore(winMax) + 1;

const generateLosingScore = (winningScore: number): number => 
  winningScore === 1 ? 0 : generateRandomScore(winningScore - 1) + 1;

const generateDrawScores = (drawMax: number): MatchResult => {
  const score = generateRandomScore(drawMax);
  return {
    homeTeamScore: score,
    awayTeamScore: score
  };
};

const generateWinScores = (winMax: number, isHomeWin: boolean): MatchResult => {
  const winningScore = generateWinningScore(winMax);
  const losingScore = generateLosingScore(winningScore);
  
  return isHomeWin ? {
    homeTeamScore: winningScore,
    awayTeamScore: losingScore
  } : {
    homeTeamScore: losingScore,
    awayTeamScore: winningScore
  };
};

export const matchResultPrediction = (d: MatchPredictionParams, silent = false): MatchResult | false => {
  if (d.homeTeamCoef >= 1 || d.awayTeamCoef >= 1) {
    if (!silent) {
      console.warn('Team coefficient must be lower than 1!');
    }
    return false;
  }

  const random = Math.random();
  const coefficients = getTeamCoefficients(d.homeTeamCoef, d.awayTeamCoef);
  const drawChance = calculateDrawChance(coefficients);

  if (d.homeTeamCoef === d.awayTeamCoef || random < drawChance) {
    return generateDrawScores(d.drawMax);
  }

  return generateWinScores(
    d.winMax, 
    random < d.homeTeamCoef
  );
}; 