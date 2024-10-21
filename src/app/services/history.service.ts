// services/history.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiCalls: string[] = [];

  addCall(url: string) {
    const timestamp = new Date().toLocaleString('sr-RS');
    const historyEntry = `[${timestamp}] GET ${url}`;
    this.apiCalls.push(historyEntry);
  }

  getHistory() {
    return this.apiCalls;
  }
}
