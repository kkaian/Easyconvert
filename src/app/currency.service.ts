import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/5a354c15e20ff4bff0c06f15/latest/';

  constructor(private http: HttpClient) { }

  // Método para obter taxas de câmbio com base em uma moeda de origem
  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`);
  }
}
