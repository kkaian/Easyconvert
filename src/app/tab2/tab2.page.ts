import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  history = [
    { date: '2024-11-01', from: 'USD', to: 'EUR', amount: '100' },
    { date: '2024-11-02', from: 'EUR', to: 'BRL', amount: '200' }
    // depois boto o local storage to com pegriça
  ];
}

