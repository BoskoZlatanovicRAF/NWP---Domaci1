import { Component } from '@angular/core';
import { DandelionService } from '../../services/dandelion.service';

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent {
  text: string = '';
  detectedLangs: any[] = [];
  clean : boolean = false;

  constructor(private dandelionService: DandelionService) { }


  onSubmit() {
    this.dandelionService.detectLanguage(this.text, this.clean)
      .subscribe({
        next: (result) => {
          console.log('Result:', result);
          this.detectedLangs = result.detectedLangs;
        },
        error: (error) => {
          console.log("nije uspeo");
          console.error('Error:', error);
        }
      });
  }
}
