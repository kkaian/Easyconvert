import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  convertedValue: number | null = null;

  constructor(private currencyService: CurrencyService) {}

  // Método para inverter as moedas de origem e destino
  inverterMoedas() {
    const temp = this.moedaOrigem;
    this.moedaOrigem = this.moedaDestino;
    this.moedaDestino = temp;
  }

  convertCurrency() {
    if (!this.moedaOrigem || !this.moedaDestino || !this.valor) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    this.currencyService.getExchangeRates(this.moedaOrigem).subscribe(
      (data) => {
        const taxa = data.conversion_rates[this.moedaDestino];
        if (taxa) {
          this.convertedValue = this.valor * taxa;
          const historyItem = {
            date: new Date().toISOString().split('T')[0],
            from: this.moedaOrigem,
            to: this.moedaDestino,
            amount: this.valor,
            convertedValue: this.convertedValue
          };
          this.currencyService.saveConversionHistory(historyItem); // Salva e emite o evento
        } else {
          alert('Não foi possível encontrar a taxa de câmbio.');
        }
      },
      (error) => {
        alert('Ocorreu um erro ao obter a taxa de câmbio.');
        console.error(error);
      }
    );
  }
}