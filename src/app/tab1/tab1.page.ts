import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  convertedValue?: number;

  convertCurrency() {
    // depois boto o diabo da api
    this.convertedValue = 123.45; // Exemplo de valor só pra ilustrar
  }
}
