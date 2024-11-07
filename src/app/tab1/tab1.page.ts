import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  // Moedas selecionadas e valor para converter
  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  convertedValue: number | null = null;

  constructor(private currencyService: CurrencyService) {}

  convertCurrency() {
    // Verifica se os campos estão preenchidos
    if (!this.moedaOrigem || !this.moedaDestino || !this.valor) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Chama o serviço para obter a taxa de câmbio
    this.currencyService.getExchangeRates(this.moedaOrigem).subscribe(
      (data) => {
        // Obtém a taxa de câmbio entre a moeda de origem e a moeda de destino
        const taxa = data.conversion_rates[this.moedaDestino];
        if (taxa) {
          // Calcula o valor convertido
          this.convertedValue = this.valor * taxa;
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