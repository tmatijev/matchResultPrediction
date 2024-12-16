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
export declare function matchResultPrediction(d: MatchPredictionParams): MatchResult | false;
export {};
