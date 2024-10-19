import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DandelionService {

  private apiUrl = 'https://api.dandelion.eu/datatxt/';
  constructor(private http: HttpClient) { }

  validateToken(token: string): Observable<any> {
   console.log("usao u validateToken");
    const params = new HttpParams()
      .set('text', 'The Mona Lisa is a sixteenth century oil painting created by Leonardo. It\'s held at the Louvre in Paris.')
      .set('min_confidence', '0.5')
      .set('token', token);

    console.log(this.apiUrl + params.toString());
    return this.http.get(this.apiUrl + 'nex/v1', { params });
  }

  extractEntities(text: string, minConfidence: number, include: string[]): Observable<any> {
    const token = localStorage.getItem('dandelionToken');
    let params = new HttpParams()
      .set('text', text)
      .set('min_confidence', minConfidence.toString())
      .set('token', token || '') //null-safety

    if (include.length > 0) {
      params = params.set('include', include.join(','));
    }

    console.log(this.apiUrl);
    console.log(params.toString());
    console.log(`${this.apiUrl}?${params.toString()}`);
    return this.http.get(this.apiUrl + 'nex/v1', { params });
  }

  textSimilarity(text1: string, text2: string) : Observable<any> {
    const token = localStorage.getItem('dandelionToken');
    let params = new HttpParams()
      .set('text1', text1)
      .set('text2', text2)
      .set('token', token || '')

    return this.http.get(this.apiUrl + 'sim/v1', {params})
  }

}
