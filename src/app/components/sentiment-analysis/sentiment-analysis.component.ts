import { Component } from '@angular/core';
import { DandelionService } from '../../services/dandelion.service';
import {SentimentResponse} from "./interface/sentiment.interface";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})

export class SentimentAnalysisComponent {
  text: string = '';
  lang: string = 'auto';

  score: number = 0.0;
  type: string = '';

  constructor(private dandelionService: DandelionService) { }


  onSubmit() {
    this.dandelionService.sentimentAnalysis(this.text, this.lang)
      .subscribe({
        next: (result) => {
         this.score = result.sentiment.score;
          this.type = result.sentiment.type;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  getColorForScore(score: number): string {
    if (score < 0) {
      // Interpolate between red and yellow for negative scores
      const normalizedScore = (score + 1); // Convert [-1, 0] to [0, 1]
      const red = [255, 0, 0];        // Negative (red)
      const yellow = [255, 255, 0];   // Neutral (yellow)

      return `rgb(${red[0]},
        ${Math.round(normalizedScore * yellow[1])},
        ${red[2]})`;
    } else {
      // Interpolate between yellow and green for positive scores
      const normalizedScore = score;  // Already in [0, 1]
      const yellow = [255, 255, 0];   // Neutral (yellow)
      const green = [0, 255, 0];      // Positive (green)

      return `rgb(${Math.round((1 - normalizedScore) * yellow[0])},
        ${yellow[1]},
        ${Math.round(normalizedScore * green[2])})`;
    }
  }
}
