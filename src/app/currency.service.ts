import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/5a354c15e20ff4bff0c06f15/latest/';
  conversionAdded = new EventEmitter<void>();
  constructor(private http: HttpClient) { }

  // Método para obter taxas de câmbio com base em uma moeda de origem
  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`);
  }

  saveConversionHistory(historyItem: any) {
    const currentHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    currentHistory.push(historyItem);
    localStorage.setItem('conversionHistory', JSON.stringify(currentHistory));
    this.conversionAdded.emit(); // Emite o evento para notificar as tabs
  }
}
