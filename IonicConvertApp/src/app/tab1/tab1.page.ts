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
  convertedSymbol: string = ''; // Símbolo da moeda

  // Configurações de notificações
  showNotificationPopup: boolean = false;
  updateFrequency: string = 'Diariamente'; // Frequência de atualização padrão
  enableNotifications: boolean = false; // Notificações desabilitadas por padrão

  constructor(private currencyService: CurrencyService) {}

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
  
    // Define o símbolo da moeda de destino antes de mostrar o valor convertido
    this.convertedSymbol = this.getCurrencySymbol(this.moedaDestino);
  
    // Chama o método para obter taxas de câmbio, levando em consideração se o usuário está online ou offline
    this.currencyService.getExchangeRates(this.moedaOrigem).subscribe(
      (data) => {
        const taxa = data.conversion_rates[this.moedaDestino];
        if (taxa) {
          this.convertedValue = this.valor * taxa;
  
          // Salva o histórico da conversão
          const conversionHistoryItem = {
            date: new Date().toISOString(),
            from: this.moedaOrigem,
            to: this.moedaDestino,
            amount: this.valor,
            convertedValue: this.convertedValue
          };
          this.currencyService.saveConversionHistory(conversionHistoryItem);
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
  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'BRL':
        return 'R$';
      default:
        return '';
    }
  }

  // Abre o pop-up de notificações
  openNotificationPopup() {
    this.showNotificationPopup = true;
  }

  // Fecha o pop-up de notificações
  closeNotificationPopup() {
    this.showNotificationPopup = false;
  }

  // Salva as configurações de notificações
  saveNotificationSettings() {
    console.log('Configurações salvas:');
    console.log('Frequência de Atualização:', this.updateFrequency);
    console.log('Notificações Habilitadas:', this.enableNotifications);
    this.closeNotificationPopup();

    if (this.enableNotifications) {
      alert('Notificações habilitadas com a frequência: ' + this.updateFrequency);
    } else {
      alert('Notificações desabilitadas.');
    }
  }
}
