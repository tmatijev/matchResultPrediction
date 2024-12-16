# Match Result Prediction 🎯
[![npm version](https://img.shields.io/npm/v/match-result-prediction.svg)](https://www.npmjs.com/package/match-result-prediction)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sophisticated TypeScript library for predicting football match results based on team coefficients. Perfect for sports simulations, game development, or statistical analysis.

## 🚀 Features

- Type-safe with full TypeScript support
- Realistic score predictions based on team strength
- Configurable draw and win conditions
- Zero dependencies
- Functional programming approach
- Well-tested and maintained

## 📦 Installation

```bash
npm install match-result-prediction
# or
yarn add match-result-prediction
# or
pnpm add match-result-prediction
```

### Usage
Simply pass the params for teams:

```typescript
import { matchResultPrediction } from 'match-result-prediction';

const scores = matchResultPrediction({
  homeTeamCoef: 0.91,
  awayTeamCoef: 0.75,
  drawMax: 3,
  winMax: 5
});
```

### Params
- `homeTeamCoef` - Home team coefficient. `Float` in range from `0` to `1`
- `awayTeamCoef` - Away team coefficient. `Float` in range from `0` to `1`
- `drawMax` - When randomly draw is selected, this will be maximum value of a draw score
- `winMax` - When randomly win is selected, this will be maximum value of winning team

### License
MIT-Licensed.
