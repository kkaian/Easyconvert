import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  history: Array<{ date: string, from: string, to: string, amount: number, convertedValue: number }> = [];
  private conversionSubscription!: Subscription;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadConversionHistory();
    this.conversionSubscription = this.currencyService.conversionAdded.subscribe(() => {
      this.loadConversionHistory(); // Atualiza automaticamente ao receber nova conversão
    });
  }

  loadConversionHistory() {
    const storedHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    this.history = storedHistory;
  }

  ngOnDestroy() {
    // Cancela a inscrição para evitar vazamentos de memória
    if (this.conversionSubscription) {
      this.conversionSubscription.unsubscribe();
    }
  }
}