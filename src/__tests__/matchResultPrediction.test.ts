import { matchResultPrediction } from '../matchResultPrediction';

type PredictionType = 'win' | 'loose' | 'draw' | 'draw-check';

interface TestConfig {
  iterations: number;
  homeTeamCoef: number;
  awayTeamCoef: number;
  drawMax: number;
  winMax: number;
}

const DEFAULT_TEST_CONFIG: TestConfig = {
  iterations: 300,
  homeTeamCoef: 0.75,
  awayTeamCoef: 0.75,
  drawMax: 3,
  winMax: 5
};

const generatePredictions = (
  type: PredictionType, 
  config: TestConfig = DEFAULT_TEST_CONFIG
): (number | boolean)[] => {
  const predictions = Array.from({ length: config.iterations }, () => 
    matchResultPrediction(config, true)
  );

  return predictions
    .filter((r): r is { homeTeamScore: number; awayTeamScore: number } => r !== false)
    .map(result => {
      switch (type) {
        case 'draw-check':
          return result.homeTeamScore === result.awayTeamScore;
        case 'draw':
          return result.homeTeamScore === result.awayTeamScore ? result.homeTeamScore : null;
        case 'win':
          return result.homeTeamScore > result.awayTeamScore 
            ? result.homeTeamScore 
            : result.awayTeamScore;
        case 'loose':
          return result.homeTeamScore < result.awayTeamScore 
            ? result.homeTeamScore 
            : result.awayTeamScore;
        default:
          return null;
      }
    })
    .filter((score): score is number | boolean => score !== null);
};

describe('matchPrediction validation', () => {
  it.each([
    ['home team', { ...DEFAULT_TEST_CONFIG, homeTeamCoef: 1 }],
    ['away team', { ...DEFAULT_TEST_CONFIG, awayTeamCoef: 1 }]
  ])('should return false if %s coefficient is higher or equal than 1', (_, config) => {
    expect(matchResultPrediction(config)).toBe(false);
  });
});

describe('matchPrediction scores', () => {
  it.each([
    ['winning', 'win', 6],
    ['losing', 'loose', 5],
    ['drawing', 'draw', 4]
  ])('%s team should never get score higher than %d', (_, type, max) => {
    const scores = generatePredictions(type as PredictionType);
    expect(scores.length).toBeGreaterThan(0);
    scores.forEach(score => {
      expect(typeof score === 'number' && score).toBeLessThan(max);
    });
  });

  it('drawing teams should have same scores', () => {
    const results = generatePredictions('draw-check');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(result => result === true)).toBe(true);
  });
}); 