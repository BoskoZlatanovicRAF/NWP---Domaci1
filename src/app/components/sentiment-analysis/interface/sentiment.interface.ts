export interface SentimentResponse {
  timestamp: string;
  time: number;
  lang: string;
  sentiment: {
    score: number;
    type: string;
  }
}
