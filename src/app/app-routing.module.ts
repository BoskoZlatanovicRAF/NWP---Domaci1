import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenConfigComponent } from './components/token-config/token-config.component';
import { EntityExtractionComponent } from './components/entity-extraction/entity-extraction.component';
import { TextSimilarityComponent } from './components/text-similarity/text-similarity.component';
import { LanguageDetectionComponent } from './components/language-detection/language-detection.component';
import { SentimentAnalysisComponent } from './components/sentiment-analysis/sentiment-analysis.component';
import { HistoryComponent } from './components/history/history.component';
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: 'token-config', component: TokenConfigComponent },
  {
    path: 'entity-extraction',
    component: EntityExtractionComponent,
    canActivate: [authGuard]
  },
  {
    path: 'text-similarity',
    component: TextSimilarityComponent,
    canActivate: [authGuard]
  },
  {
    path: 'language-detection',
    component: LanguageDetectionComponent,
    canActivate: [authGuard]
  },
  {
    path: 'sentiment-analysis',
    component: SentimentAnalysisComponent,
    canActivate: [authGuard]
  },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: '/token-config', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
