import { Component } from '@angular/core';
import {DandelionService}  from "../../services/dandelion.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent {

  text1: string = '';
  text2: string = '';
  similarity: number = 0.0;

  loading: boolean = false;
  error: string | null = null;
  constructor(private dandelionService: DandelionService) { }

  onSubmit() {
    this.loading = true;
    this.error = null;

    this.dandelionService.textSimilarity(this.text1, this.text2)
      .subscribe({
        next: (result) => {
          this.similarity = result.similarity;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
        }
      });
  }
}
