import { Component } from '@angular/core';
import { DandelionService } from '../../services/dandelion.service';

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent {
  text: string = '';
  minConfidence: number = 0.5;
  includeOptions = {
    image: false,
    abstract: false, // ovo je nesto kao opis
    categories: false // sta opisuje taj entitet?
  };
  results: any[] = [];

  loading: boolean = false;
  error: string | null = null;
  constructor(private dandelionService: DandelionService) { }

  onSubmit() {
    this.loading = true;
    this.error = null;
    const includeOptions = Object.keys(this.includeOptions)
      .filter(key => this.includeOptions[key as keyof typeof this.includeOptions]);

    this.dandelionService.extractEntities(this.text, this.minConfidence, includeOptions)
      .subscribe({
        next: (result) => {
          this.results = result.annotations;
          this.results = result.annotations;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.error = 'Enter a valid dandelion token.';
          this.loading = false;
        }
      });
  }
}
