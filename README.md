# Match Result Prediction
[![npm status](https://img.shields.io/badge/npm-v1.0.2-brightgreen.svg)](https://www.npmjs.org/package/roundrobin)

A simple match prediction code based on the club coefficient.

### Usage
Simply pass the params for teams:

```js
var scores = matchResultPrediction({
  homeTeamCoef,
  awayTeamCoef,
  drawMax: 3,
  winMax: 5
});
```

### Params
`homeTeamCoef` - Home team coefficient. `Float` in range from `0` to `1`
`awayTeamCoef` - Away team coefficient. `Float` in range from `0` to `1`
`drawMax` - When randomly draw is selected, this will be maximum value of a draw score
`winMax` - When randomly win is selected, this will be maximum value of winning team

### Installation
`npm i match-result-prediction`

### License
MIT-Licensed.